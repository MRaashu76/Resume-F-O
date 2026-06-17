import React from 'react'
import { Check } from 'lucide-react'

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Bold sidebar with blue accents. Perfect for tech and creative roles.',
    colors: ['#0F172A', '#2196F3', '#93C5FD'],
    badge: 'Most Popular',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, text-focused layout. Lets your content speak for itself.',
    colors: ['#111827', '#6B7280', '#F3F4F6'],
    badge: 'ATS Optimized',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional dark header with structured two-column layout.',
    colors: ['#1E293B', '#475569', '#F8FAFC'],
    badge: 'Business Ready',
  },
]

export default function TemplateStep({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">Choose a template. You can switch anytime — your data is preserved.</p>
      <div className="space-y-3">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => onSelect(tpl.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
              selected === tpl.id
                ? 'border-primary bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                : 'border-border hover:border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
            }`}
          >
            {/* Color swatch preview */}
            <div className="flex-shrink-0 w-14 h-16 rounded-lg overflow-hidden border border-border shadow-sm" aria-hidden>
              <div style={{ background: tpl.colors[0], height: '40%' }} className="flex items-center justify-center">
                <div className="w-6 h-1 rounded" style={{ background: tpl.colors[1] }} />
              </div>
              <div style={{ background: '#fff', height: '60%', padding: '4px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-1 rounded mb-1" style={{ background: tpl.colors[2], width: `${100 - i * 15}%` }} />
                ))}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-secondary">{tpl.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">{tpl.badge}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed">{tpl.description}</p>
            </div>

            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all ${
              selected === tpl.id ? 'border-primary bg-primary' : 'border-slate-300 dark:border-slate-700'
            }`}>
              {selected === tpl.id && <Check size={11} className="text-white" strokeWidth={3} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
