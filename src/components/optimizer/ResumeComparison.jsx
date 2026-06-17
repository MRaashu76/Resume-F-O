import React, { useState } from 'react'
import { Copy, Check, FileText, Sparkles } from 'lucide-react'

function ResumeTextView({ text, label, accent = false }) {
  return (
    <div className={`flex flex-col h-full min-h-0`}>
      <div className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b ${
        accent
          ? 'bg-primary text-white border-primary'
          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-border'
      }`}>
        {accent ? <Sparkles size={13} /> : <FileText size={13} />}
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className={`flex-1 overflow-auto rounded-b-xl border ${
        accent ? 'border-primary/30 bg-blue-50/20' : 'border-border bg-white dark:bg-slate-900'
      }`}>
        <pre className="p-4 text-xs leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap font-mono">
          {text || <span className="text-slate-400 dark:text-slate-500 italic">No content</span>}
        </pre>
      </div>
    </div>
  )
}

export default function ResumeComparison({ originalText, optimizedText }) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('side-by-side')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = optimizedText
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div>
          <h3 className="font-bold text-secondary flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            Optimized Resume
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">
            Content rewritten and keyword-aligned for this specific job description
          </p>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
          {/* View toggle */}
          <div className="flex rounded-xl border border-border overflow-hidden text-xs font-medium">
            {['side-by-side', 'original', 'optimized'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-800/50'
                }`}
              >
                {tab === 'side-by-side' ? 'Side by Side' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              copied
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800/30'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-border hover:border-primary hover:text-primary'
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className={`${activeTab === 'side-by-side' ? 'grid md:grid-cols-2 gap-4' : ''} h-[520px]`}>
        {(activeTab === 'side-by-side' || activeTab === 'original') && (
          <ResumeTextView text={originalText} label="Original Resume" />
        )}
        {(activeTab === 'side-by-side' || activeTab === 'optimized') && (
          <ResumeTextView text={optimizedText} label="Optimized Resume" accent />
        )}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
        ℹ️ The optimized version actively fabricates and injects missing experience to match job requirements.
      </p>
    </div>
  )
}
