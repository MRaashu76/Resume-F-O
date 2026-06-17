import React from 'react'
import { CircularProgress, ProgressBar } from '../ui'

function getScoreColor(score) {
  if (score >= 75) return '#22C55E'
  if (score >= 50) return '#2196F3'
  if (score >= 30) return '#F59E0B'
  return '#EF4444'
}

function getScoreLabel(score) {
  if (score >= 75) return 'Strong Match'
  if (score >= 50) return 'Good Match'
  if (score >= 30) return 'Fair Match'
  return 'Weak Match'
}

export default function MatchScoreCard({ analysis }) {
  const { overallScore, keywordMatchPct, skillsMatchPct, atsScore } = analysis
  const color = getScoreColor(overallScore)
  const label = getScoreLabel(overallScore)

  const metrics = [
    { label: 'Keyword Match', value: keywordMatchPct, color: getScoreColor(keywordMatchPct) },
    { label: 'Skills Match', value: skillsMatchPct, color: getScoreColor(skillsMatchPct) },
    { label: 'ATS Readiness', value: atsScore, color: getScoreColor(atsScore) },
  ]

  return (
    <div className="card p-6">
      <h3 className="font-bold text-secondary mb-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        Match Analysis
      </h3>

      <div className="flex flex-col sm:flex-row gap-8 items-center">
        {/* Overall circular */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <CircularProgress value={overallScore} size={100} strokeWidth={7} color={color} />
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-0.5 rounded-full text-white whitespace-nowrap"
              style={{ background: color }}
            >
              {label}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-3 font-medium">Overall Match</p>
        </div>

        {/* Sub metrics */}
        <div className="flex-1 w-full space-y-4">
          {metrics.map(({ label, value, color: c }) => (
            <div key={label}>
              <ProgressBar value={value} color={c} label={label} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
