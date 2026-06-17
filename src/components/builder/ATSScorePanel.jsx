import React from 'react'
import { calculateATSScore } from '../../utils/scoring'
import { CircularProgress } from '../ui'

function getColor(score) {
  if (score >= 80) return '#22C55E'
  if (score >= 60) return '#2196F3'
  if (score >= 40) return '#F59E0B'
  return '#EF4444'
}

export default function ATSScorePanel({ data }) {
  const { score, breakdown } = calculateATSScore(data)
  const color = getColor(score)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-secondary">ATS Readiness</h4>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Applicant Tracking System score</p>
        </div>
        <CircularProgress value={score} size={64} strokeWidth={5} color={color} />
      </div>

      <div className="space-y-2">
        {breakdown.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: item.score === item.max ? '#22C55E' : item.score > 0 ? '#F59E0B' : '#E2E8F0' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-300 truncate">{item.label}</span>
                <span className="font-medium text-slate-700 dark:text-slate-200 ml-1">{item.score}/{item.max}</span>
              </div>
              <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.score / item.max) * 100}%`,
                    background: item.score === item.max ? '#22C55E' : item.score > 0 ? '#F59E0B' : '#E2E8F0'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
