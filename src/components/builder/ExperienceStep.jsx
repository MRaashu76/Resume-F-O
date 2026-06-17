import React from 'react'
import ListEditor from './ListEditor'

function ExperienceForm({ data, setData }) {
  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }))
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Job Title</label>
        <input className="input-field" placeholder="e.g. Senior Frontend Engineer" value={data.jobTitle || ''} onChange={e => set('jobTitle', e.target.value)} />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Company</label>
        <input className="input-field" placeholder="e.g. Stripe" value={data.company || ''} onChange={e => set('company', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Start Date</label>
        <input className="input-field" placeholder="Jan 2021" value={data.startDate || ''} onChange={e => set('startDate', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">End Date</label>
        <input className="input-field" placeholder="Present" value={data.endDate || ''} onChange={e => set('endDate', e.target.value)} />
      </div>
      <div className="col-span-2">
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Description</label>
        <textarea
          className="input-field resize-none"
          rows={4}
          placeholder="Describe your responsibilities, achievements, and impact. Use active verbs: 'Led', 'Built', 'Reduced'..."
          value={data.description || ''}
          onChange={e => set('description', e.target.value)}
        />
      </div>
    </div>
  )
}

function ExperiencePreview({ item }) {
  return (
    <div>
      <div className="font-semibold text-sm text-secondary">{item.jobTitle || 'Untitled Role'}</div>
      <div className="text-xs text-primary mt-0.5">{item.company}</div>
      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.startDate}{item.endDate ? ` – ${item.endDate}` : ''}</div>
    </div>
  )
}

export default function ExperienceStep({ data, onAdd, onUpdate, onDelete }) {
  return (
    <ListEditor
      items={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
      renderForm={(formData, setFormData) => <ExperienceForm data={formData} setData={setFormData} />}
      renderPreview={(item) => <ExperiencePreview item={item} />}
      emptyText="No experience entries yet."
      addLabel="Add Experience"
    />
  )
}
