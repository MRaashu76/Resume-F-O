export function calculateATSScore(data) {
  let score = 0
  const breakdown = []

  // Contact info (25 points)
  const personalFields = ['fullName', 'email', 'phone', 'location']
  const filledPersonal = personalFields.filter(f => data.personal?.[f]?.trim())
  const personalScore = Math.round((filledPersonal.length / personalFields.length) * 25)
  score += personalScore
  breakdown.push({ label: 'Contact Info', score: personalScore, max: 25, filled: filledPersonal.length, total: personalFields.length })

  // Summary (20 points)
  const summaryLen = data.summary?.trim().length || 0
  const summaryScore = summaryLen > 100 ? 20 : summaryLen > 50 ? 12 : summaryLen > 0 ? 6 : 0
  score += summaryScore
  breakdown.push({ label: 'Professional Summary', score: summaryScore, max: 20, filled: summaryLen > 0 ? 1 : 0, total: 1 })

  // Experience (25 points)
  const expCount = data.experience?.length || 0
  const expScore = expCount >= 2 ? 25 : expCount === 1 ? 15 : 0
  score += expScore
  breakdown.push({ label: 'Work Experience', score: expScore, max: 25, filled: expCount, total: 2 })

  // Education (15 points)
  const eduCount = data.education?.length || 0
  const eduScore = eduCount >= 1 ? 15 : 0
  score += eduScore
  breakdown.push({ label: 'Education', score: eduScore, max: 15, filled: eduCount, total: 1 })

  // Skills (15 points)
  const skillCount = data.skills?.length || 0
  const skillScore = skillCount >= 5 ? 15 : skillCount >= 3 ? 10 : skillCount >= 1 ? 5 : 0
  score += skillScore
  breakdown.push({ label: 'Skills', score: skillScore, max: 15, filled: skillCount, total: 5 })

  return { score: Math.min(score, 100), breakdown }
}

export function calculateResumeStrength(data) {
  let points = 0
  let maxPoints = 0
  const sections = []

  // Personal info completeness
  const personalFields = ['fullName', 'title', 'email', 'phone', 'location', 'linkedin', 'portfolio']
  const filledPersonal = personalFields.filter(f => data.personal?.[f]?.trim()).length
  const personalPct = Math.round((filledPersonal / personalFields.length) * 100)
  points += filledPersonal
  maxPoints += personalFields.length
  sections.push({ label: 'Profile', pct: personalPct, icon: 'user' })

  // Summary
  const hasSummary = (data.summary?.trim().length || 0) > 30
  points += hasSummary ? 2 : 0
  maxPoints += 2
  sections.push({ label: 'Summary', pct: hasSummary ? 100 : 0, icon: 'file-text' })

  // Experience
  const expCount = data.experience?.length || 0
  const expPct = Math.min(Math.round((expCount / 3) * 100), 100)
  points += Math.min(expCount, 3) * 2
  maxPoints += 6
  sections.push({ label: 'Experience', pct: expPct, icon: 'briefcase' })

  // Education
  const eduCount = data.education?.length || 0
  const eduPct = Math.min(Math.round((eduCount / 2) * 100), 100)
  points += Math.min(eduCount, 2)
  maxPoints += 2
  sections.push({ label: 'Education', pct: eduPct, icon: 'graduation-cap' })

  // Skills
  const skillCount = data.skills?.length || 0
  const skillPct = Math.min(Math.round((skillCount / 8) * 100), 100)
  points += Math.min(skillCount, 8)
  maxPoints += 8
  sections.push({ label: 'Skills', pct: skillPct, icon: 'zap' })

  // Projects
  const projCount = data.projects?.length || 0
  const projPct = Math.min(Math.round((projCount / 2) * 100), 100)
  points += Math.min(projCount, 2)
  maxPoints += 2
  sections.push({ label: 'Projects', pct: projPct, icon: 'code' })

  const overall = Math.round((points / maxPoints) * 100)

  return { overall, sections }
}

export function getStrengthLabel(score) {
  if (score >= 85) return { label: 'Excellent', color: '#22C55E' }
  if (score >= 65) return { label: 'Good', color: '#2196F3' }
  if (score >= 40) return { label: 'Fair', color: '#F59E0B' }
  return { label: 'Needs Work', color: '#EF4444' }
}
