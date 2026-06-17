import React from 'react'

export default function ModernTemplate({ data }) {
  const { personal, summary, education, experience, projects, skills, certifications } = data

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#0F172A', background: '#fff', width: '100%', minHeight: '1056px', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '32%', background: '#0F172A', color: '#fff', padding: '32px 20px', flexShrink: 0 }}>
        {/* Name & Title */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '6px' }}>
            {personal.fullName || 'Your Name'}
          </div>
          <div style={{ fontSize: '11px', color: '#93C5FD', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {personal.title || 'Professional Title'}
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#60A5FA', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
            Contact
          </div>
          {personal.email && <div style={{ marginBottom: '6px', color: '#CBD5E1', wordBreak: 'break-all' }}>✉ {personal.email}</div>}
          {personal.phone && <div style={{ marginBottom: '6px', color: '#CBD5E1' }}>✆ {personal.phone}</div>}
          {personal.location && <div style={{ marginBottom: '6px', color: '#CBD5E1' }}>⌖ {personal.location}</div>}
          {personal.linkedin && <div style={{ marginBottom: '6px', color: '#93C5FD', wordBreak: 'break-all' }}>{personal.linkedin}</div>}
          {personal.portfolio && <div style={{ color: '#93C5FD', wordBreak: 'break-all' }}>{personal.portfolio}</div>}
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#60A5FA', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
              Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {skills.map((skill, i) => (
                <span key={i} style={{ background: 'rgba(96,165,250,0.15)', color: '#93C5FD', padding: '3px 8px', borderRadius: '20px', fontSize: '9.5px', border: '1px solid rgba(96,165,250,0.2)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#60A5FA', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px' }}>
              Certifications
            </div>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: '600', color: '#E2E8F0', fontSize: '10px' }}>{cert.name}</div>
                <div style={{ color: '#94A3B8', fontSize: '9px' }}>{cert.organization}</div>
                {cert.year && <div style={{ color: '#64748B', fontSize: '9px' }}>{cert.year}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 28px' }}>
        {/* Summary */}
        {summary && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2196F3', marginBottom: '8px', paddingBottom: '5px', borderBottom: '2px solid #2196F3' }}>
              Professional Summary
            </div>
            <p style={{ color: '#475569', lineHeight: 1.65, fontSize: '10.5px', whiteSpace: 'pre-wrap' }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2196F3', marginBottom: '8px', paddingBottom: '5px', borderBottom: '2px solid #2196F3' }}>
              Work Experience
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '11.5px', color: '#0F172A' }}>{exp.jobTitle}</div>
                    <div style={{ color: '#2196F3', fontWeight: '600', fontSize: '10px' }}>{exp.company}</div>
                  </div>
                  <div style={{ color: '#64748B', fontSize: '9.5px', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} – {exp.endDate}
                  </div>
                </div>
                {exp.description && (
                  <p style={{ color: '#475569', lineHeight: 1.6, marginTop: '5px', fontSize: '10.5px', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <div style={{ marginBottom: '22px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2196F3', marginBottom: '8px', paddingBottom: '5px', borderBottom: '2px solid #2196F3' }}>
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '11.5px', color: '#0F172A' }}>{edu.degree}</div>
                    <div style={{ color: '#2196F3', fontWeight: '600', fontSize: '10px' }}>{edu.institution}</div>
                  </div>
                  <div style={{ color: '#64748B', fontSize: '9.5px', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {edu.startYear} – {edu.endYear}
                  </div>
                </div>
                {edu.description && (
                  <p style={{ color: '#475569', lineHeight: 1.6, marginTop: '4px', fontSize: '10.5px', whiteSpace: 'pre-wrap' }}>{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#2196F3', marginBottom: '8px', paddingBottom: '5px', borderBottom: '2px solid #2196F3' }}>
              Projects
            </div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: '700', fontSize: '11.5px', color: '#0F172A' }}>{proj.name}</div>
                  {proj.url && <div style={{ color: '#2196F3', fontSize: '9.5px' }}>{proj.url}</div>}
                </div>
                {proj.technologies && (
                  <div style={{ color: '#64748B', fontSize: '9.5px', marginTop: '2px' }}>
                    <span style={{ fontWeight: '600' }}>Tech: </span>{proj.technologies}
                  </div>
                )}
                {proj.description && (
                  <p style={{ color: '#475569', lineHeight: 1.6, marginTop: '4px', fontSize: '10.5px', whiteSpace: 'pre-wrap' }}>{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
