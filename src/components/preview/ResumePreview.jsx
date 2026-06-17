import React from 'react'
import ModernTemplate from '../templates/ModernTemplate'
import MinimalTemplate from '../templates/MinimalTemplate'
import CorporateTemplate from '../templates/CorporateTemplate'

const templates = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  corporate: CorporateTemplate,
}

export default function ResumePreview({ data, id = 'resume-preview' }) {
  const Template = templates[data.template] || templates.modern

  return (
    <div
      id={id}
      style={{
        width: '794px',
        minHeight: '1123px',
        background: '#fff',
        boxShadow: '0 4px 40px rgba(0,0,0,0.12)',
        borderRadius: '4px',
        overflow: 'hidden',
        transformOrigin: 'top left',
      }}
    >
      <Template data={data} />
    </div>
  )
}
