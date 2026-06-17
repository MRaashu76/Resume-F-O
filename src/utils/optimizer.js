import { defaultResumeData } from './resumeData'

// ─── Keyword extraction ────────────────────────────────────────────────────────

// Words to ignore when extracting keywords
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by',
  'from','as','is','was','are','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall',
  'that','this','these','those','it','its','we','our','you','your','they',
  'their','i','my','he','she','him','her','us','them','who','which','what',
  'when','where','how','why','not','no','so','if','than','then','also','any',
  'all','both','each','few','more','most','other','some','such','only','own',
  'same','too','very','just','because','while','although','however','therefore',
  'experience','work','job','role','position','team','company','business',
  'years','year','strong','excellent','good','great','ability','skills','skill',
  'knowledge','understanding','using','use','used','well','including','key',
  'new','high','large','small','multiple','various','across','within','between',
])

export function extractKeywords(text) {
  if (!text) return []
  const words = text
    .toLowerCase()
    .replace(/[^\w\s+#.]/g, ' ')
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 2 && !STOP_WORDS.has(w))

  // Also extract multi-word technical terms
  const techPhrases = []
  const phrasePatterns = [
    /\b(react\.?js|vue\.?js|next\.?js|node\.?js|express\.?js)\b/gi,
    /\b(machine learning|deep learning|natural language processing|computer vision)\b/gi,
    /\b(rest(?:ful)? api|graphql api|api design|api development)\b/gi,
    /\b(ci\/cd|devops|test.driven development|agile methodology|scrum master)\b/gi,
    /\b(aws|gcp|azure|google cloud|amazon web services)\b/gi,
    /\b(typescript|javascript|python|java|golang?|rust|c\+\+|c#)\b/gi,
    /\b(postgresql|mongodb|mysql|redis|elasticsearch)\b/gi,
    /\b(docker|kubernetes|terraform|ansible)\b/gi,
    /\b(product management|project management|stakeholder management)\b/gi,
    /\b(data analysis|data science|data engineering|business intelligence)\b/gi,
    /\b(ux design|ui design|user experience|user interface)\b/gi,
    /\b(full.?stack|front.?end|back.?end|full stack|frontend|backend)\b/gi,
    /\b(microservices|micro.?services|event.driven)\b/gi,
    /\b(object.oriented|functional programming|system design)\b/gi,
    /\b(sql|nosql|orm)\b/gi,
  ]
  phrasePatterns.forEach(pat => {
    const matches = text.match(pat) || []
    matches.forEach(m => techPhrases.push(m.toLowerCase().trim()))
  })

  const freq = {}
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
  techPhrases.forEach(p => { freq[p] = (freq[p] || 0) + 3 }) // boost phrases

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
}

// ─── Parse uploaded resume text ────────────────────────────────────────────────

export function parseResumeText(text) {
  if (!text) return { raw: '', sections: {} }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const sections = {}
  let currentSection = 'header'
  let buffer = []

  const sectionHeaders = {
    summary: /^(summary|professional summary|about|profile|objective)/i,
    experience: /^(experience|work experience|employment|work history|professional experience)/i,
    education: /^(education|academic|qualifications)/i,
    skills: /^(skills|technical skills|core competencies|competencies|expertise|technologies)/i,
    projects: /^(projects|personal projects|key projects|portfolio)/i,
    certifications: /^(certifications?|certificates?|credentials|licenses?)/i,
  }

  lines.forEach(line => {
    const matchedSection = Object.entries(sectionHeaders).find(([, rx]) => rx.test(line))
    if (matchedSection && line.length < 60) {
      sections[currentSection] = buffer.join('\n')
      buffer = []
      currentSection = matchedSection[0]
    } else {
      buffer.push(line)
    }
  })
  sections[currentSection] = buffer.join('\n')

  return { raw: text, sections }
}

// ─── Match scoring ─────────────────────────────────────────────────────────────

export function analyzeMatch(resumeText, jobDescription) {
  const jdKeywords = extractKeywords(jobDescription)
  const resumeKeywords = extractKeywords(resumeText)
  const resumeLower = resumeText.toLowerCase()
  const jdLower = jobDescription.toLowerCase()

  // Which JD keywords appear in resume?
  const top40JD = jdKeywords.slice(0, 40)
  const matched = top40JD.filter(kw => resumeLower.includes(kw))
  const missing = top40JD.filter(kw => !resumeLower.includes(kw))

  const keywordMatchPct = top40JD.length > 0
    ? Math.round((matched.length / top40JD.length) * 100)
    : 0

  // Skills — look for common tech/soft skills in JD not in resume
  const skillsInJD = extractTechSkills(jobDescription)
  const skillsInResume = extractTechSkills(resumeText)
  const missingSkills = skillsInJD.filter(s => !skillsInResume.some(r => r.toLowerCase() === s.toLowerCase()))
  const matchedSkills = skillsInJD.filter(s => skillsInResume.some(r => r.toLowerCase() === s.toLowerCase()))
  const skillsMatchPct = skillsInJD.length > 0
    ? Math.round((matchedSkills.length / skillsInJD.length) * 100)
    : 50

  // Overall score: weighted combo
  const overallScore = Math.min(
    Math.round(keywordMatchPct * 0.5 + skillsMatchPct * 0.35 + 15),
    98
  )

  // ATS score based on structure
  const atsScore = calculateATSFromText(resumeText, jobDescription)

  return {
    overallScore,
    keywordMatchPct,
    skillsMatchPct,
    atsScore,
    matchedKeywords: matched.slice(0, 20),
    missingKeywords: missing.slice(0, 16),
    matchedSkills,
    missingSkills: missingSkills.slice(0, 10),
    jdKeywords: top40JD,
  }
}

function extractTechSkills(text) {
  const skillPatterns = [
    'JavaScript','TypeScript','Python','Java','Go','Golang','Rust','C++','C#','Ruby','PHP','Swift','Kotlin',
    'React','Vue','Angular','Next.js','Nuxt','Svelte','Remix',
    'Node.js','Express','FastAPI','Django','Flask','Spring','Rails','Laravel',
    'GraphQL','REST','gRPC','WebSocket',
    'PostgreSQL','MySQL','MongoDB','Redis','Elasticsearch','DynamoDB','Cassandra',
    'AWS','GCP','Azure','Docker','Kubernetes','Terraform','Ansible','CI/CD',
    'Git','GitHub','GitLab','Jira','Agile','Scrum','Kanban',
    'Machine Learning','Deep Learning','TensorFlow','PyTorch','NLP','Computer Vision',
    'Figma','Sketch','Adobe XD','UI/UX','Design Systems',
    'TypeScript','HTML','CSS','Tailwind','SASS','Webpack','Vite',
    'Linux','Bash','Shell','DevOps','SRE','Microservices',
    'Product Management','Data Analysis','SQL','Excel','Tableau','Power BI',
  ]
  const textLower = text.toLowerCase()
  return skillPatterns.filter(s => textLower.includes(s.toLowerCase()))
}

function calculateATSFromText(resumeText, jd) {
  let score = 40 // base
  const lower = resumeText.toLowerCase()
  if (/summary|objective|profile/i.test(resumeText)) score += 10
  if (/experience|employment/i.test(resumeText)) score += 15
  if (/education/i.test(resumeText)) score += 10
  if (/skills|competencies/i.test(resumeText)) score += 10
  if (resumeText.length > 500) score += 5
  if (resumeText.length > 1500) score += 5
  if (/\d{4}/.test(resumeText)) score += 5 // has years
  return Math.min(score, 98)
}

// ─── Generate suggestions ──────────────────────────────────────────────────────

export function generateSuggestions(analysis, resumeText, jobDescription) {
  const suggestions = []
  const { missingKeywords, missingSkills, overallScore, keywordMatchPct } = analysis

  if (keywordMatchPct < 60) {
    suggestions.push({
      type: 'critical',
      icon: 'target',
      title: 'Increase keyword alignment',
      detail: `Your resume matches ${keywordMatchPct}% of JD keywords. Add relevant terms from the job description naturally into your experience bullets.`,
    })
  }

  if (!/\d+%|\d+x|\$[\d,]+|\d+ (users|clients|team|engineers|projects)/i.test(resumeText)) {
    suggestions.push({
      type: 'critical',
      icon: 'trending-up',
      title: 'Add measurable achievements',
      detail: 'Quantify your impact — e.g. "Reduced load time by 40%", "Led a team of 5 engineers", "Grew revenue by $200K".',
    })
  }

  if (missingSkills.length > 0) {
    suggestions.push({
      type: 'important',
      icon: 'zap',
      title: `Add missing skills to your Skills section`,
      detail: `The job mentions: ${missingSkills.slice(0, 5).join(', ')}. If you have experience with these, list them explicitly.`,
    })
  }

  if (!/summary|objective|profile/i.test(resumeText)) {
    suggestions.push({
      type: 'important',
      icon: 'file-text',
      title: 'Add a Professional Summary',
      detail: 'A tailored 2–3 sentence summary at the top dramatically improves ATS parsing and recruiter first impressions.',
    })
  }

  if (missingKeywords.length > 3) {
    suggestions.push({
      type: 'important',
      icon: 'search',
      title: 'Incorporate missing keywords',
      detail: `Consider naturally adding: "${missingKeywords.slice(0, 4).join('", "')}" into your experience or summary sections.`,
    })
  }

  suggestions.push({
    type: 'tip',
    icon: 'edit',
    title: 'Use stronger action verbs',
    detail: 'Start each bullet with powerful verbs: Architected, Engineered, Launched, Reduced, Scaled, Optimized, Delivered, Led.',
  })

  if (!/linkedin|github|portfolio|website/i.test(resumeText)) {
    suggestions.push({
      type: 'tip',
      icon: 'link',
      title: 'Add your LinkedIn and portfolio URL',
      detail: 'Recruiters and ATS systems look for professional profiles. Include your LinkedIn and any portfolio links.',
    })
  }

  return suggestions
}

// ─── Generate optimized resume text ───────────────────────────────────────────

export function generateOptimizedResume(resumeText, jobDescription, analysis) {
  const { sections } = parseResumeText(resumeText)
  const { missingKeywords, missingSkills } = analysis

  // Extract job title from JD
  const jdTitleMatch = jobDescription.match(/(?:hiring|looking for|seeking|role of|position[:\s]+|join as[:\s]+)([^.!?\n]{5,60})/i)
  const targetRole = jdTitleMatch ? jdTitleMatch[1].trim() : ''

  // Pull top keywords to weave in
  const topJDWords = extractKeywords(jobDescription).slice(0, 25)

  let optimized = resumeText

  // Rewrite summary if present
  if (sections.summary) {
    const improvedSummary = rewriteSummary(sections.summary, topJDWords, targetRole, missingKeywords)
    optimized = optimized.replace(sections.summary, improvedSummary)
  }

  // Improve experience bullets
  if (sections.experience) {
    let improvedExp = improveBullets(sections.experience, topJDWords)
    
    // Inject missing keywords to fabricate experience
    if (missingKeywords && missingKeywords.length > 0) {
       const keywordsToInject = missingKeywords.filter(kw => kw.length > 3 && !['learn', 'like', 'with', 'this', 'that', 'they', 'from', 'have'].includes(kw.toLowerCase())).slice(0, 4);
       if (keywordsToInject.length > 0) {
           // Append a fabricated bullet to the top of the experience block
           const firstBulletMatch = improvedExp.match(/\n[•*-]/);
           if (firstBulletMatch) {
               improvedExp = improvedExp.replace(/\n[•*-]/, `\n• Spearheaded the development of key initiatives using ${keywordsToInject.join(', ')} to drive scalable results.\n$&`);
           } else {
               improvedExp += `\n• Spearheaded the development of key initiatives using ${keywordsToInject.join(', ')} to drive scalable results.`;
           }
       }
    }

    optimized = optimized.replace(sections.experience, improvedExp)
  }

  // Improve skills section by injecting ALL missing skills AND keywords
  const allKeywordsToAdd = [...(missingSkills || [])]
  if (missingKeywords && missingKeywords.length > 0) {
    missingKeywords.forEach(kw => {
      if (kw.length > 3 && !['learn', 'like', 'with', 'this', 'that', 'they', 'from', 'have'].includes(kw.toLowerCase())) {
        allKeywordsToAdd.push(kw)
      }
    })
  }

  if (allKeywordsToAdd.length > 0) {
    if (sections.skills) {
      const improvedSkills = sections.skills.trimEnd() + '\\n' + allKeywordsToAdd.join(', ')
      optimized = optimized.replace(sections.skills, improvedSkills)
    } else {
      optimized += '\\n\\nSKILLS\\n' + allKeywordsToAdd.join(', ')
    }
  }

  return optimized.trim()
}

function rewriteSummary(summary, jdKeywords, targetRole, missingKeywords) {
  // Keep the substance, improve wording and keyword alignment
  let improved = summary.trim()

  // Insert relevant keywords that are missing but natural to include
  const keywordsToAdd = missingKeywords
    .filter(kw => kw.length > 4)
    .slice(0, 3)

  if (keywordsToAdd.length > 0 && improved.length > 50) {
    // Append a tailored sentence
    const kwList = keywordsToAdd.slice(0, 2).join(' and ')
    improved += ` Brings hands-on experience with ${kwList}, aligned with modern engineering best practices.`
  }

  // Strengthen weak opener phrases
  improved = improved
    .replace(/^(i am |i'm |my name is )/i, '')
    .replace(/\bresults[-\s]driven\b/gi, 'impact-focused')
    .replace(/\bteam player\b/gi, 'collaborative team member')
    .replace(/\bhard[\s-]working\b/gi, 'dedicated')
    .replace(/\bpassionate about\b/gi, 'deeply focused on')
    .replace(/\bresponsible for\b/gi, 'led and delivered')
    .replace(/\bhelped (to )?/gi, 'directly contributed to ')
    .replace(/\bworked on\b/gi, 'engineered')
    .replace(/\bwas involved in\b/gi, 'contributed to')

  return improved
}

function improveBullets(experienceText, jdKeywords) {
  const lines = experienceText.split('\n')

  const actionVerbSwaps = {
    'worked on': 'engineered',
    'helped with': 'contributed to',
    'was responsible for': 'led',
    'assisted in': 'supported and delivered',
    'involved in': 'instrumental in',
    'did': 'executed',
    'made': 'developed',
    'handled': 'managed',
    'took care of': 'oversaw',
    'participated in': 'actively contributed to',
  }

  return lines.map(line => {
    let improved = line
    Object.entries(actionVerbSwaps).forEach(([weak, strong]) => {
      const rx = new RegExp(`\\b${weak}\\b`, 'gi')
      improved = improved.replace(rx, strong)
    })
    return improved
  }).join('\n')
}

function expandSkills(skillsText, missingSkills) {
  // Only add skills that are plausibly related — don't fabricate expertise
  const safeToAdd = missingSkills.filter(s => {
    // Only suggest adding if it's a common adjacent skill
    const common = ['Git','GitHub','Agile','Scrum','REST','SQL','Linux','Docker','CI/CD']
    return common.some(c => s.toLowerCase().includes(c.toLowerCase()))
  }).slice(0, 3)

  if (safeToAdd.length === 0) return skillsText
  return skillsText.trimEnd() + '\n' + safeToAdd.join(', ')
}

// ─── Generate optimized structured resume data ───────────────────────────────

export function optimizeResumeData(data, jobDescription, analysis) {
  const { missingKeywords, missingSkills } = analysis
  
  const jdTitleMatch = jobDescription.match(/(?:hiring|looking for|seeking|role of|position[:\\s]+|join as[:\\s]+)([^.!?\\n]{5,60})/i)
  const targetRole = jdTitleMatch ? jdTitleMatch[1].trim() : ''
  const topJDWords = extractKeywords(jobDescription).slice(0, 25)

  // Deep clone to avoid mutating original
  const optimized = JSON.parse(JSON.stringify(data))

  // Optimize summary
  if (optimized.summary) {
    optimized.summary = rewriteSummary(optimized.summary, topJDWords, targetRole, missingKeywords)
  }

  // Optimize experience descriptions
  if (optimized.experience && Array.isArray(optimized.experience) && optimized.experience.length > 0) {
    optimized.experience = optimized.experience.map((exp, index) => {
      let desc = exp.description ? improveBullets(exp.description, topJDWords) : exp.description
      
      // Fabricate experience on the most recent job
      if (index === 0 && missingKeywords && missingKeywords.length > 0) {
        const keywordsToInject = missingKeywords.filter(kw => kw.length > 3 && !['learn', 'like', 'with', 'this', 'that', 'they', 'from', 'have'].includes(kw.toLowerCase())).slice(0, 4);
        if (keywordsToInject.length > 0) {
           desc = `• Spearheaded the development of key initiatives using ${keywordsToInject.join(', ')} to drive scalable results.\n` + (desc || '');
        }
      }
      
      return {
        ...exp,
        description: desc
      }
    })
  }

  // Optimize skills - add ALL missing skills AND keywords identified in the job description
  const allKeywordsToAdd = [...(missingSkills || [])]
  if (missingKeywords && missingKeywords.length > 0) {
    missingKeywords.forEach(kw => {
      if (kw.length > 3 && !['learn', 'like', 'with', 'this', 'that', 'they', 'from', 'have'].includes(kw.toLowerCase())) {
        allKeywordsToAdd.push(kw)
      }
    })
  }

  if (allKeywordsToAdd.length > 0) {
    if (!optimized.skills || !Array.isArray(optimized.skills)) {
      optimized.skills = []
    }
    
    allKeywordsToAdd.forEach(item => {
      if (!optimized.skills.find(s => s.toLowerCase() === item.toLowerCase())) {
        optimized.skills.push(item)
      }
    })
  }

  return optimized
}

export function textToStructuredData(text) {
  const { sections } = parseResumeText(text)
  const data = JSON.parse(JSON.stringify(defaultResumeData))
  
  // -- Parse Header --
  const headerText = sections.header || ''
  const emailMatch = headerText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)
  const phoneMatch = headerText.match(/(\+?\d[\d\-\s()]{8,}\d)/)
  const linkedinMatch = headerText.match(/(linkedin\.com\/in\/[^\s|]+)/i)
  const githubMatch = headerText.match(/(github\.com\/[^\s|]+)/i)
  
  // Find a portfolio link that is not email, linkedin, or github
  const allLinks = [...headerText.matchAll(/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s|]*)?)/gi)].map(m => m[1])
  const portfolioLink = allLinks.find(l => 
    !l.includes('@') && 
    !l.toLowerCase().includes('linkedin.com') && 
    !l.toLowerCase().includes('github.com') &&
    !['gmail.com', 'yahoo.com', 'hotmail.com'].some(d => l.toLowerCase().includes(d))
  )

  const headerLines = headerText.split('\n').map(l => l.trim()).filter(Boolean)
  if (headerLines.length > 0) {
    // The first line that isn't a contact info is usually the name
    data.personal.fullName = headerLines[0].replace(/\|.*/, '').trim()
    
    // The second line is usually the title
    if (headerLines.length > 1) {
       const titleLine = headerLines[1].split('|')[0].trim()
       if (!titleLine.includes('@') && !titleLine.match(/\d{8,}/)) {
         data.personal.title = titleLine
       }
    }
  }

  data.personal.email = emailMatch ? emailMatch[1] : ''
  data.personal.phone = phoneMatch ? phoneMatch[1] : ''
  data.personal.linkedin = linkedinMatch ? linkedinMatch[1] : ''
  data.personal.portfolio = githubMatch ? githubMatch[1] : (portfolioLink || '')

  if (sections.summary) data.summary = sections.summary

  // -- Helper to parse block sections (Experience, Education, Projects) --
  const parseBlocks = (rawText, defaultTitle) => {
    if (!rawText) return null
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean)
    const blocks = []
    let currentBlock = null

    lines.forEach(line => {
      // If line doesn't start with a bullet, treat it as a header line (Title | Company | Date)
      if (!line.match(/^[•\-\*]/) && line.length < 120 && (line.includes('|') || line.includes('-') || line.match(/\b20\d{2}\b/))) {
        if (currentBlock) blocks.push(currentBlock)
        
        const parts = line.split(/\|| - /).map(s => s.trim())
        currentBlock = {
          id: Math.random().toString(36).substr(2, 9),
          title: parts[0] || defaultTitle,
          subtitle: parts[1] || '',
          date: parts[2] || (line.match(/\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4} - (?:Present|\d{4}))\b/i) || [])[0] || '',
          description: []
        }
      } else {
        if (!currentBlock) {
          currentBlock = { id: Math.random().toString(36).substr(2, 9), title: defaultTitle, subtitle: '', date: '', description: [] }
        }
        currentBlock.description.push(line)
      }
    })
    if (currentBlock) blocks.push(currentBlock)
    return blocks
  }

  const expBlocks = parseBlocks(sections.experience, 'Professional Experience')
  if (expBlocks) {
    data.experience = expBlocks.map(b => ({
      id: b.id,
      jobTitle: b.title,
      company: b.subtitle,
      startDate: b.date.split('-')[0]?.trim() || '',
      endDate: b.date.split('-')[1]?.trim() || '',
      description: b.description.join('\n')
    }))
  }
  
  const eduBlocks = parseBlocks(sections.education, 'Education')
  if (eduBlocks) {
    data.education = eduBlocks.map(b => ({
      id: b.id,
      degree: b.title,
      institution: b.subtitle,
      startYear: b.date.split('-')[0]?.trim() || '',
      endYear: b.date.split('-')[1]?.trim() || '',
      description: b.description.join('\n')
    }))
  }

  const projBlocks = parseBlocks(sections.projects, 'Project')
  if (projBlocks) {
    data.projects = projBlocks.map(b => ({
      id: b.id,
      name: b.title,
      technologies: b.subtitle,
      description: b.description.join('\n'),
      url: ''
    }))
  }

  if (sections.skills) {
    // Strip category labels like "Languages:" before splitting so we only get the actual skills
    const cleanSkills = sections.skills.replace(/.*?:/g, ',')
    data.skills = cleanSkills.split(/,|\n|\|/).map(s => s.trim()).filter(s => s.length > 0)
  }

  if (sections.certifications) {
    const lines = sections.certifications.split('\n').map(l => l.replace(/^[•*-]\s*/, '').trim()).filter(Boolean)
    data.certifications = lines.map((line, i) => ({
      id: `cert-${i}`,
      name: line,
      organization: '',
      year: '',
      description: ''
    }))
  }

  // Fallback: If no sections were found (strict parsing failed), put the body of the resume into experience
  const hasAnySection = sections.summary || sections.experience || sections.education || sections.projects || sections.skills || sections.certifications
  if (!hasAnySection) {
    const remainingLines = headerLines.slice(3)
    if (remainingLines.length > 0) {
      data.experience = [{
        id: '1',
        jobTitle: 'Resume Content',
        company: '',
        startDate: '',
        endDate: '',
        description: remainingLines.join('\n')
      }]
    }
  }

  return data
}
