import React from 'react'
import ListEditor from './ListEditor'

function EducationForm({ data, setData }) {
  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }))
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Degree / Qualification</label>
        <input className="input-field" placeholder="e.g. B.S. Computer Science" value={data.degree || ''} onChange={e => set('degree', e.target.value)} />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Institution</label>
        <input className="input-field" placeholder="e.g. MIT" value={data.institution || ''} onChange={e => set('institution', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Start Year</label>
        <input className="input-field" placeholder="2018" value={data.startYear || ''} onChange={e => set('startYear', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">End Year</label>
        <input className="input-field" placeholder="2022 or Present" value={data.endYear || ''} onChange={e => set('endYear', e.target.value)} />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Description (optional)</label>
        <textarea className="input-field resize-none" rows={3} placeholder="Honors, relevant coursework, thesis..." value={data.description || ''} onChange={e => set('description', e.target.value)} />
      </div>
    </div>
  )
}

function EducationPreview({ item }) {
  return (
    <div>
      <div className="font-semibold text-sm text-secondary">{item.degree || 'Untitled Degree'}</div>
      <div className="text-xs text-primary mt-0.5">{item.institution}</div>
      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.startYear}{item.endYear ? ` – ${item.endYear}` : ''}</div>
    </div>
  )
}

export default function EducationStep({ data, onAdd, onUpdate, onDelete }) {
  return (
    <ListEditor
      items={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
      renderForm={(formData, setFormData) => <EducationForm data={formData} setData={setFormData} />}
      renderPreview={(item) => <EducationPreview item={item} />}
      emptyText="No education entries yet."
      addLabel="Add Education"
    />
  )
}
