import React from 'react'
import { CheckCircle, XCircle, Tag } from 'lucide-react'

export default function KeywordAnalysis({ analysis }) {
  const { matchedKeywords, missingKeywords } = analysis

  return (
    <div className="card p-6">
      <h3 className="font-bold text-secondary mb-5 flex items-center gap-2">
        <Tag size={16} className="text-primary" />
        Keyword Analysis
      </h3>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Matched */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={14} className="text-success flex-shrink-0" />
            <span className="text-sm font-semibold text-success">Found in resume</span>
            <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full font-medium">
              {matchedKeywords.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchedKeywords.length > 0 ? matchedKeywords.map(kw => (
              <span
                key={kw}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-900/30"
              >
                {kw}
              </span>
            )) : (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">No keyword matches found.</p>
            )}
          </div>
        </div>

        {/* Missing */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={14} className="text-red-400 dark:text-red-500 dark:text-red-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-red-500 dark:text-red-400">Missing keywords</span>
            <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full font-medium">
              {missingKeywords.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {missingKeywords.length > 0 ? missingKeywords.map(kw => (
              <span
                key={kw}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30"
              >
                {kw}
              </span>
            )) : (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">Great — no major keywords missing!</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills gap */}
      {analysis.missingSkills?.length > 0 && (
        <div className="mt-5 pt-5 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Skills mentioned in JD not found in resume</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {analysis.missingSkills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            If you have experience with these, add them to your Skills section.
          </p>
        </div>
      )}
    </div>
  )
}
