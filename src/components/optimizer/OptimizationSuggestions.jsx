import React, { useState } from 'react'
import {
  Target, TrendingUp, Zap, FileText, Search, Edit, Link,
  ChevronDown, ChevronUp, AlertCircle, Info, Lightbulb
} from 'lucide-react'

const iconMap = {
  target: Target,
  'trending-up': TrendingUp,
  zap: Zap,
  'file-text': FileText,
  search: Search,
  edit: Edit,
  link: Link,
}

const typeStyles = {
  critical: {
    badge: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30',
    icon: 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    label: 'Critical',
    labelColor: 'text-red-500 dark:text-red-400',
  },
  important: {
    badge: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30',
    icon: 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    label: 'Important',
    labelColor: 'text-amber-500 dark:text-amber-400',
  },
  tip: {
    badge: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30',
    icon: 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    label: 'Tip',
    labelColor: 'text-blue-500 dark:text-blue-400',
  },
}

export default function OptimizationSuggestions({ suggestions }) {
  const [expanded, setExpanded] = useState(null)

  if (!suggestions?.length) return null

  return (
    <div className="card p-6">
      <h3 className="font-bold text-secondary mb-5 flex items-center gap-2">
        <Lightbulb size={16} className="text-warning" />
        Improvement Suggestions
        <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-medium">
          {suggestions.length}
        </span>
      </h3>

      <div className="space-y-2">
        {suggestions.map((sug, i) => {
          const style = typeStyles[sug.type] || typeStyles.tip
          const Icon = iconMap[sug.icon] || Info
          const isOpen = expanded === i

          return (
            <div
              key={i}
              className={`rounded-xl border overflow-hidden transition-all ${
                isOpen ? 'border-slate-200 dark:border-slate-700 shadow-sm' : 'border-border'
              }`}
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:bg-slate-800/50 transition-colors text-left"
                onClick={() => setExpanded(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${style.icon}`}>
                  <Icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-secondary">{sug.title}</span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${style.badge}`}>
                  {style.label}
                </span>
                {isOpen
                  ? <ChevronUp size={14} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  : <ChevronDown size={14} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                }
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-border bg-slate-50/50 dark:bg-slate-800/30">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{sug.detail}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
