import React from 'react'

export default function CorporateTemplate({ data }) {
  const { personal, summary, education, experience, projects, skills, certifications } = data

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#1E293B', background: '#fff', width: '100%', minHeight: '1056px' }}>
      {/* Header */}
      <div style={{ background: '#1E293B', color: '#fff', padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '4px' }}>
              {personal.fullName || 'Your Name'}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {personal.title}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '9.5px', color: '#94A3B8', lineHeight: 1.8 }}>
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.location && <div>{personal.location}</div>}
          </div>
        </div>
        {(personal.linkedin || personal.portfolio) && (
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '20px', fontSize: '9.5px', color: '#60A5FA' }}>
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        )}
      </div>

      <div style={{ padding: '28px 36px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '22px', padding: '14px 16px', background: '#F8FAFC', borderLeft: '3px solid #1E293B', borderRadius: '0 6px 6px 0' }}>
            <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '10.5px' }}>{summary}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Left column */}
          <div style={{ flex: 2 }}>
            {/* Experience */}
            {experience?.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#1E293B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#1E293B' }} />
                  Work Experience
                </div>
                {experience.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <div style={{ fontWeight: '700', fontSize: '12px', color: '#0F172A' }}>{exp.jobTitle}</div>
                      <div style={{ fontSize: '9px', color: '#64748B', fontWeight: '600', background: '#F1F5F9', padding: '2px 8px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                        {exp.startDate} – {exp.endDate}
                      </div>
                    </div>
                    <div style={{ color: '#475569', fontSize: '10px', fontWeight: '600', marginBottom: '5px' }}>{exp.company}</div>
                    {exp.description && <p style={{ color: '#64748B', lineHeight: 1.65, fontSize: '10.5px' }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#1E293B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#1E293B' }} />
                  Projects
                </div>
                {projects.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: '700', fontSize: '11.5px', color: '#0F172A' }}>{proj.name}</span>
                      {proj.url && <span style={{ fontSize: '9px', color: '#64748B' }}>{proj.url}</span>}
                    </div>
                    {proj.technologies && <div style={{ fontSize: '9.5px', color: '#94A3B8', marginTop: '2px' }}>Technologies: {proj.technologies}</div>}
                    {proj.description && <p style={{ color: '#64748B', lineHeight: 1.6, marginTop: '4px', fontSize: '10.5px' }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Education */}
            {education?.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#1E293B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#1E293B' }} />
                  Education
                </div>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ fontWeight: '700', fontSize: '11px', color: '#0F172A' }}>{edu.degree}</div>
                    <div style={{ color: '#475569', fontSize: '10px', marginBottom: '2px' }}>{edu.institution}</div>
                    <div style={{ fontSize: '9px', color: '#94A3B8' }}>{edu.startYear} – {edu.endYear}</div>
                    {edu.description && <p style={{ color: '#64748B', lineHeight: 1.6, marginTop: '4px', fontSize: '10px' }}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#1E293B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#1E293B' }} />
                  Skills
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {skills.map((skill, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '4px', height: '4px', background: '#1E293B', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: '10.5px', color: '#334155' }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: '#1E293B', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#1E293B' }} />
                  Certifications
                </div>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ marginBottom: '10px' }}>
                    <div style={{ fontWeight: '600', fontSize: '10.5px', color: '#0F172A' }}>{cert.name}</div>
                    <div style={{ color: '#64748B', fontSize: '9.5px' }}>{cert.organization}</div>
                    {cert.year && <div style={{ color: '#94A3B8', fontSize: '9px' }}>{cert.year}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
