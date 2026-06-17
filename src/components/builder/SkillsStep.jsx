import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

const suggestedSkills = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java',
  'Go', 'Rust', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'Azure',
  'Docker', 'Kubernetes', 'Git', 'GraphQL', 'REST APIs', 'Figma', 'Tailwind CSS',
]

export default function SkillsStep({ data, onAdd, onRemove }) {
  const [input, setInput] = useState('')

  const handleAdd = (skill) => {
    const trimmed = skill.trim()
    if (trimmed && !data.includes(trimmed)) {
      onAdd(trimmed)
    }
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      handleAdd(input)
    }
    if (e.key === 'Backspace' && !input && data.length > 0) {
      onRemove(data[data.length - 1])
    }
  }

  const suggestions = suggestedSkills.filter(s => !data.includes(s))

  return (
    <div className="space-y-4">
      {/* Tag input area */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">Your Skills</label>
        <div className="min-h-[100px] p-3 border border-border rounded-xl bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <div className="flex flex-wrap gap-2 mb-2">
            {data.map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 px-3 py-1 rounded-full text-xs font-medium">
                {skill}
                <button
                  onClick={() => onRemove(skill)}
                  className="text-blue-400 dark:text-blue-500 dark:text-blue-400 hover:text-red-500 dark:text-red-400 transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X size={11} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => input.trim() && handleAdd(input)}
              placeholder={data.length === 0 ? 'Type a skill and press Enter...' : '+ Add more'}
              className="text-sm outline-none border-none bg-transparent text-secondary placeholder-slate-400 min-w-[140px] flex-1"
            />
          </div>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">Press Enter or comma to add. Backspace to remove last.</p>
      </div>

      {/* Suggestions */}
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-2">Quick add popular skills:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.slice(0, 16).map((skill) => (
            <button
              key={skill}
              onClick={() => handleAdd(skill)}
              className="text-xs px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary hover:bg-blue-50 dark:bg-blue-900/20 transition-all"
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {data.length > 0 && (
        <div className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2">
          ✓ {data.length} skill{data.length !== 1 ? 's' : ''} added — aim for 6–10 for best ATS performance
        </div>
      )}
    </div>
  )
}
