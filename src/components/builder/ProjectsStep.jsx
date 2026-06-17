import React from 'react'
import ListEditor from './ListEditor'

function ProjectForm({ data, setData }) {
  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }))
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Project Name</label>
        <input className="input-field" placeholder="e.g. DevMetrics" value={data.name || ''} onChange={e => set('name', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Technologies Used</label>
        <input className="input-field" placeholder="React, Node.js, PostgreSQL..." value={data.technologies || ''} onChange={e => set('technologies', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Project URL (optional)</label>
        <input className="input-field" placeholder="github.com/user/project or live link" value={data.url || ''} onChange={e => set('url', e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">Description</label>
        <textarea className="input-field resize-none" rows={3} placeholder="What did you build and why? What was the impact?" value={data.description || ''} onChange={e => set('description', e.target.value)} />
      </div>
    </div>
  )
}

function ProjectPreview({ item }) {
  return (
    <div>
      <div className="font-semibold text-sm text-secondary">{item.name || 'Untitled Project'}</div>
      {item.technologies && <div className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">{item.technologies}</div>}
      {item.url && <div className="text-xs text-primary mt-0.5">{item.url}</div>}
    </div>
  )
}

export default function ProjectsStep({ data, onAdd, onUpdate, onDelete }) {
  return (
    <ListEditor
      items={data}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onDelete={onDelete}
      renderForm={(formData, setFormData) => <ProjectForm data={formData} setData={setFormData} />}
      renderPreview={(item) => <ProjectPreview item={item} />}
      emptyText="No projects added yet. Showcase your best work!"
      addLabel="Add Project"
    />
  )
}
