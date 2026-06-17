import React from 'react'

export default function MinimalTemplate({ data }) {
  const { personal, summary, education, experience, projects, skills, certifications } = data

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#111827', background: '#fff', width: '100%', minHeight: '1056px', padding: '40px 48px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', borderBottom: '1px solid #E5E7EB', paddingBottom: '20px' }}>
        <div style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-1px', color: '#111827', marginBottom: '4px' }}>
          {personal.fullName || 'Your Name'}
        </div>
        <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500', marginBottom: '10px' }}>
          {personal.title}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '10px', color: '#4B5563' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '8px' }}>
            About
          </div>
          <p style={{ color: '#374151', lineHeight: 1.7, fontSize: '10.5px' }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '8px' }}>
            Experience
          </div>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
              <div style={{ width: '80px', flexShrink: 0, color: '#9CA3AF', fontSize: '9.5px', paddingTop: '2px' }}>
                {exp.startDate}<br />—<br />{exp.endDate}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '11.5px', color: '#111827' }}>{exp.jobTitle}</div>
                <div style={{ color: '#6B7280', fontSize: '10px', marginBottom: '4px' }}>{exp.company}</div>
                {exp.description && <p style={{ color: '#4B5563', lineHeight: 1.65, fontSize: '10.5px' }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '8px' }}>
            Education
          </div>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', gap: '16px' }}>
              <div style={{ width: '80px', flexShrink: 0, color: '#9CA3AF', fontSize: '9.5px', paddingTop: '2px' }}>
                {edu.startYear}–{edu.endYear}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', fontSize: '11.5px', color: '#111827' }}>{edu.degree}</div>
                <div style={{ color: '#6B7280', fontSize: '10px', marginBottom: '4px' }}>{edu.institution}</div>
                {edu.description && <p style={{ color: '#4B5563', lineHeight: 1.6, fontSize: '10.5px' }}>{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '8px' }}>
            Skills
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((skill, i) => (
              <span key={i} style={{ background: '#F3F4F6', color: '#374151', padding: '3px 10px', borderRadius: '4px', fontSize: '10px', border: '1px solid #E5E7EB' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '8px' }}>
            Projects
          </div>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: '700', fontSize: '11.5px', color: '#111827' }}>{proj.name}</span>
                {proj.url && <span style={{ color: '#9CA3AF', fontSize: '9.5px' }}>{proj.url}</span>}
              </div>
              {proj.technologies && <div style={{ color: '#6B7280', fontSize: '9.5px', marginTop: '2px' }}>Stack: {proj.technologies}</div>}
              {proj.description && <p style={{ color: '#4B5563', lineHeight: 1.65, marginTop: '4px', fontSize: '10.5px' }}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <div>
          <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '8px' }}>
            Certifications
          </div>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '8px', display: 'flex', gap: '16px' }}>
              <div style={{ width: '80px', flexShrink: 0, color: '#9CA3AF', fontSize: '9.5px', paddingTop: '2px' }}>{cert.year}</div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '11px', color: '#111827' }}>{cert.name}</div>
                <div style={{ color: '#6B7280', fontSize: '9.5px' }}>{cert.organization}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
