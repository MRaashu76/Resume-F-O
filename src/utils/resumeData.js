export const defaultResumeData = {
  personal: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  template: 'modern',
}

export const sampleResumeData = {
  personal: {
    fullName: 'Alex Morgan',
    title: 'Senior Software Engineer',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    portfolio: 'alexmorgan.dev',
  },
  summary: 'Experienced software engineer with 6+ years building scalable web applications. Passionate about clean code, developer experience, and shipping products users love.',
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      institution: 'University of California, Berkeley',
      startYear: '2014',
      endYear: '2018',
      description: 'Graduated with honors. Focus on distributed systems and algorithms.',
    }
  ],
  experience: [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'Stripe',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Led frontend platform team, reducing page load times by 40%. Architected component library used across 12 product teams.',
    },
    {
      id: '2',
      jobTitle: 'Software Engineer',
      company: 'Figma',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      description: 'Built real-time collaboration features for the design editor. Contributed to performance improvements handling 10k+ node canvases.',
    }
  ],
  projects: [
    {
      id: '1',
      name: 'DevMetrics',
      description: 'Open-source developer productivity dashboard with GitHub and Jira integrations.',
      technologies: 'React, TypeScript, Node.js, PostgreSQL',
      url: 'github.com/alexmorgan/devmetrics',
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'GraphQL', 'PostgreSQL'],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      year: '2022',
    }
  ],
  template: 'modern',
}
