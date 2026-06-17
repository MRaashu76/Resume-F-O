import React from 'react'
import { calculateResumeStrength, getStrengthLabel } from '../../utils/scoring'
import { User, FileText, Briefcase, GraduationCap, Zap, Code } from 'lucide-react'

const iconMap = {
  user: User,
  'file-text': FileText,
  briefcase: Briefcase,
  'graduation-cap': GraduationCap,
  zap: Zap,
  code: Code,
}

export default function ResumeStrengthPanel({ data }) {
  const { overall, sections } = calculateResumeStrength(data)
  const { label, color } = getStrengthLabel(overall)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-secondary">Resume Strength</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-semibold" style={{ color }}>{label}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">· {overall}% complete</span>
          </div>
        </div>
      </div>

      {/* Overall bar */}
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${overall}%`, background: color }}
        />
      </div>

      {/* Section breakdown */}
      <div className="grid grid-cols-2 gap-2">
        {sections.map((section) => {
          const Icon = iconMap[section.icon] || User
          return (
            <div key={section.label} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: section.pct === 100 ? '#DCFCE7' : section.pct > 0 ? '#EFF6FF' : '#F1F5F9' }}
              >
                <Icon
                  size={11}
                  style={{ color: section.pct === 100 ? '#16A34A' : section.pct > 0 ? '#2196F3' : '#94A3B8' }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-600 dark:text-slate-300 truncate">{section.label}</div>
                <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-0.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${section.pct}%`,
                      background: section.pct === 100 ? '#22C55E' : section.pct > 0 ? '#2196F3' : '#E2E8F0'
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
