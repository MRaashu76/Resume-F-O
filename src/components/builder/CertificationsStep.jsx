import React from 'react'
import ListEditor from './ListEditor'

function CertForm({ data, setData }) {
  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }))
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Certification Name</label>
        <input className="input-field" placeholder="e.g. AWS Certified Solutions Architect" value={data.name || ''} onChange={e => set('name', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Issuing Organization</label>
        <input className="input-field" placeholder="e.g. Amazon Web Services" value={data.organization || ''} onChange={e => set('organization', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Year Obtained</label>
        <input className="input-field" placeholder="2023" value={data.year || ''} onChange={e => set('year', e.target.value)} />
      </div>
    </div>
  )
}

function CertPreview({ item }) {
  return (
    <div>
      <div className="font-semibold text-sm text-secondary">{item.name || 'Untitled Certification'}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">{item.organization}</div>
      {item.year && <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.year}</div>}
    </div>
  )
}

export default function CertificationsStep({ data, onAdd, onUpdate, onDelete }) {
  return (
    <ListEditor
      items={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
      renderForm={(formData, setFormData) => <CertForm data={formData} setData={setFormData} />}
      renderPreview={(item) => <CertPreview item={item} />}
      emptyText="No certifications added yet."
      addLabel="Add Certification"
    />
  )
}
