import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap, ArrowLeft, Upload, FileText, Sparkles, Download, RefreshCw,
  Loader2, AlertCircle, ChevronRight, X, CheckCircle, ClipboardPaste, Sun, Moon
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { analyzeMatch, generateSuggestions, generateOptimizedResume, parseResumeText, optimizeResumeData, textToStructuredData } from '../utils/optimizer'
import { exportToPDF } from '../utils/pdfExport'
import { useResumeData } from '../hooks/useResumeData'
import ResumePreview from '../components/preview/ResumePreview'
import MatchScoreCard from '../components/optimizer/MatchScoreCard'
import KeywordAnalysis from '../components/optimizer/KeywordAnalysis'
import OptimizationSuggestions from '../components/optimizer/OptimizationSuggestions'
import ResumeComparison from '../components/optimizer/ResumeComparison'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

// ─── Navbar ────────────────────────────────────────────────────────────────────
function OptimizerNav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-secondary tracking-tight hidden sm:inline">Resume-F&O</span>
        </Link>

        <ChevronRight size={14} className="text-slate-300" />
        <span className="text-sm font-semibold text-secondary flex items-center gap-1.5">
          <Sparkles size={14} className="text-primary" />
          Resume Optimizer
        </span>

        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <Link
            to="/builder"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors hidden sm:inline"
          >
            Resume Builder
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-secondary border border-border px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <ArrowLeft size={13} /> Home
          </Link>
        </div>
      </div>
    </header>
  )
}

// ─── Upload area ───────────────────────────────────────────────────────────────
function UploadZone({ onTextExtracted, uploadedName, onClear }) {
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleFile = useCallback(async (file) => {
    setError('')
    if (!file) return

    const allowed = ['text/plain', 'application/pdf']

    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const text = await file.text()
      onTextExtracted(text, file.name)
      return
    }

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        let fullText = ''
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const textContent = await page.getTextContent()
          let pageText = ''
          let lastY
          for (const item of textContent.items) {
            if (lastY !== undefined && Math.abs(lastY - item.transform[5]) > 4) {
              pageText += '\n'
            } else if (lastY !== undefined) {
              pageText += ' '
            }
            pageText += item.str
            lastY = item.transform[5]
          }
          fullText += pageText + '\n'
        }
        
        const extracted = fullText.replace(/  +/g, ' ').trim()
        
        if (extracted.length > 50) {
          onTextExtracted(extracted, file.name)
        } else {
          setError('Could not extract readable text from this PDF. Please paste your resume text instead.')
        }
      } catch (err) {
        console.error('PDF parsing error:', err)
        setError('Failed to parse PDF. The file might be corrupted, encrypted, or not a text-based PDF.')
      }
      return
    }

    setError('Please upload a .txt or .pdf file, paste your resume text directly, or load from the Builder.')
  }, [onTextExtracted])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="space-y-2">
      {uploadedName ? (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-xl">
          <CheckCircle size={18} className="text-success flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">Resume loaded</p>
            <p className="text-xs text-green-600 dark:text-green-400 truncate">{uploadedName}</p>
          </div>
          <button
            onClick={onClear}
            className="p-1 hover:bg-green-100 rounded-lg transition-colors text-green-500 dark:text-green-400"
            aria-label="Remove file"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragging
              ? 'border-primary bg-blue-50 dark:bg-blue-900/20 scale-[1.01]'
              : 'border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-blue-50/30'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Upload size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-secondary">Drop your resume here</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Supports .pdf, .txt files &middot; or paste text below</p>
            </div>
            <span className="text-xs font-medium text-primary border border-primary/30 bg-primary/5 px-3 py-1 rounded-full">
              Browse files
            </span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl text-xs text-amber-700 dark:text-amber-400">
          <AlertCircle size={13} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}
    </div>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function ResumeOptimizerPage() {
  const [resumeText, setResumeText] = useState('')
  const [uploadedName, setUploadedName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [optimizedText, setOptimizedText] = useState('')
  const [sourceData, setSourceData] = useState(null)
  const [optimizedData, setOptimizedData] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [exportingPDF, setExportingPDF] = useState(false)
  const [exportTarget, setExportTarget] = useState(null)
  const [error, setError] = useState('')

  const { resumeData, hasSavedData } = useResumeData()

  const handleLoadFromBuilder = () => {
    const textBuilder = []
    if (resumeData.personal) textBuilder.push(Object.values(resumeData.personal).join(' '))
    if (resumeData.summary) textBuilder.push(resumeData.summary)
    if (resumeData.experience) resumeData.experience.forEach(e => {
      textBuilder.push(`${e.jobTitle} ${e.company} ${e.description || ''}`)
    })
    if (resumeData.education) resumeData.education.forEach(e => {
      textBuilder.push(`${e.degree} ${e.institution} ${e.description || ''}`)
    })
    if (resumeData.skills) textBuilder.push(resumeData.skills.join(' '))
    if (resumeData.projects) resumeData.projects.forEach(p => {
      textBuilder.push(`${p.name} ${p.technologies || ''} ${p.description || ''}`)
    })
    
    setResumeText(textBuilder.join('\n'))
    setSourceData(resumeData)
    setUploadedName('Loaded from Builder')
  }

  const handleFileExtracted = (text, name) => {
    setResumeText(text)
    setUploadedName(name)
    setSourceData(null)
  }

  const handleClearFile = () => {
    setUploadedName('')
    setSourceData(null)
    // keep resumeText so user can still paste/edit
  }

  const handleAnalyze = useCallback(async () => {
    setError('')
    const trimmedResume = resumeText.trim()
    const trimmedJD = jobDescription.trim()

    if (!trimmedResume) {
      setError('Please upload your resume or paste its text first.')
      return
    }
    if (trimmedJD.length < 50) {
      setError('Please paste a full job description (at least 50 characters).')
      return
    }

    setAnalyzing(true)
    setAnalysis(null)
    setOptimizedText('')

    // Small delay for UX
    await new Promise(r => setTimeout(r, 600))

    const result = analyzeMatch(trimmedResume, trimmedJD)
    const sugs = generateSuggestions(result, trimmedResume, trimmedJD)
    const optimized = generateOptimizedResume(trimmedResume, trimmedJD, result)

    setAnalysis(result)
    setSuggestions(sugs)
    setOptimizedText(optimized)

    if (sourceData) {
      setOptimizedData(optimizeResumeData(sourceData, trimmedJD, result))
    } else {
      setOptimizedData(textToStructuredData(optimized))
    }

    setAnalyzing(false)

    // Scroll to results
    setTimeout(() => {
      document.getElementById('optimizer-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [resumeText, jobDescription])

  const handleReset = () => {
    setAnalysis(null)
    setSuggestions([])
    setOptimizedText('')
    setOptimizedData(null)
    setError('')
  }

  const handleExportOptimized = async () => {
    try {
      setExportingPDF(true)
      setExportTarget('optimized')
      setError('')
      const el = document.getElementById('optimized-pdf-content')
      if (!el) throw new Error('Could not find the optimized resume preview to export.')
      
      await exportToPDF('optimized-pdf-content', `${uploadedName || 'Optimized_Resume'}.pdf`)
    } catch (err) {
      setError(`Export Error: ${err.message || 'Unknown error occurred during PDF generation'}`)
    } finally {
      setExportingPDF(false)
      setExportTarget(null)
    }
  }

  const canAnalyze = resumeText.trim().length > 50 && jobDescription.trim().length > 50

  return (
    <div className="min-h-screen bg-background">
      <OptimizerNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Page header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={14} />
            AI-Powered Optimization
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-secondary mb-3 tracking-tight">
            Resume Optimizer
          </h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-lg max-w-xl mx-auto">
            Upload your resume and paste a job description. Get a match score, missing keywords, and a fully optimized version tailored to the role.
          </p>
        </div>

        {/* Input section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Resume upload + text */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-primary" />
                <h2 className="font-bold text-secondary">Your Resume</h2>
              </div>
              {hasSavedData && (
                <button
                  onClick={handleLoadFromBuilder}
                  className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  Load from Builder
                </button>
              )}
            </div>

            <UploadZone
              onTextExtracted={handleFileExtracted}
              uploadedName={uploadedName}
              onClear={handleClearFile}
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 px-2">or paste text directly</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Resume Text</label>
                <span className="text-xs text-slate-400 dark:text-slate-500">{resumeText.length} chars</span>
              </div>
              <textarea
                className="input-field resize-none font-mono text-xs"
                rows={10}
                placeholder="Paste your resume text here...&#10;&#10;Include your full resume content: contact info, summary, experience, skills, education, etc."
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
              />
            </div>
          </div>

          {/* Job description */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardPaste size={16} className="text-primary" />
              <h2 className="font-bold text-secondary">Job Description</h2>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl px-4 py-3 text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
              Paste the full job description — including requirements, responsibilities, and qualifications. More detail = more accurate analysis.
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Job Description</label>
                <span className="text-xs text-slate-400 dark:text-slate-500">{jobDescription.length} chars</span>
              </div>
              <textarea
                className="input-field resize-none text-xs"
                rows={14}
                placeholder="Paste the full job description here...&#10;&#10;Example:&#10;We are looking for a Senior Frontend Engineer...&#10;&#10;Requirements:&#10;- 4+ years of React experience&#10;- TypeScript proficiency&#10;- Experience with REST APIs..."
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-xl mb-6 text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        {/* Analyze button */}
        <div className="flex justify-center mb-12">
          {analysis ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:bg-slate-800/50 transition-all"
              >
                <RefreshCw size={15} /> New Analysis
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || analyzing}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-600 transition-all shadow-lg hover:shadow-primary/30 disabled:opacity-50"
              >
                {analyzing ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
                Re-analyze
              </button>
            </div>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={!canAnalyze || analyzing}
              className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-primary text-white font-bold text-base hover:bg-blue-600 transition-all shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {analyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing your resume...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Analyze & Optimize Resume
                </>
              )}
            </button>
          )}
        </div>

        {/* Loading skeleton */}
        {analyzing && (
          <div className="space-y-4 animate-pulse">
            <div className="grid sm:grid-cols-3 gap-4">
              {[1,2,3].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl" />)}
            </div>
            <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
          </div>
        )}

        {/* Results */}
        {analysis && !analyzing && (
          <div id="optimizer-results" className="space-y-6">
            {/* Score cards */}
            <MatchScoreCard analysis={analysis} />

            {/* Keyword analysis */}
            <KeywordAnalysis analysis={analysis} />

            {/* Suggestions */}
            <OptimizationSuggestions suggestions={suggestions} />

            {/* Comparison */}
            {optimizedText && (
              <>
                <ResumeComparison
                  originalText={resumeText}
                  optimizedText={optimizedText}
                />

                {/* Action bar */}
                {error && (
                  <div className="p-3 bg-red-100 text-red-700 text-sm rounded-xl mb-4 font-semibold border border-red-200 dark:border-red-800/30">
                    <AlertCircle size={15} className="inline mr-2 -mt-0.5" />
                    {error}
                  </div>
                )}
                
                {optimizedData && (
                  <div className="card overflow-hidden mb-6">
                    <div className="flex flex-col lg:flex-row border-b border-border">
                      <div className="p-5 flex-1 lg:border-r border-border">
                        <h3 className="text-sm font-bold text-secondary mb-4 flex items-center gap-2">
                          <FileText size={15} className="text-slate-400 dark:text-slate-500" />
                          Select a Template
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {['modern', 'minimal', 'corporate'].map(tpl => (
                            <button
                              key={tpl}
                              onClick={() => setOptimizedData({ ...optimizedData, template: tpl })}
                              className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all border ${
                                (optimizedData.template || 'modern') === tpl
                                  ? 'bg-primary text-white border-primary shadow-md'
                                  : 'bg-white dark:bg-card text-slate-600 dark:text-slate-300 border-border hover:bg-slate-50 dark:hover:bg-slate-800/50'
                              }`}
                            >
                              {tpl}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-6">
                          This preview shows exactly how your optimized resume will be formatted.
                        </p>
                      </div>

                      {/* Live Mini Preview */}
                      <div className="bg-slate-50 dark:bg-[#111] relative overflow-hidden flex justify-center w-full lg:w-[400px] h-[350px]">
                        <div style={{ transform: 'scale(0.4)', transformOrigin: 'top center', marginTop: '16px' }}>
                          <ResumePreview data={optimizedData} id="optimizer-mini-preview" />
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-md backdrop-blur-sm pointer-events-none shadow-sm">
                          Live Preview
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="card p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-secondary text-sm">Ready to export?</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">
                      {optimizedData 
                        ? 'Download your optimized resume as a beautifully formatted PDF.'
                        : 'Download your optimized resume as a plain text PDF. For formatted PDFs, load from the Builder first.'}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAnalyze}
                      disabled={analyzing}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:bg-slate-800/50 transition-all"
                    >
                      <RefreshCw size={13} /> Generate Another Version
                    </button>
                    <button
                      onClick={handleExportOptimized}
                      disabled={exportingPDF}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-600 transition-all shadow-md"
                    >
                      {exportingPDF && exportTarget === 'optimized'
                        ? <Loader2 size={13} className="animate-spin" />
                        : <Download size={13} />
                      }
                      Download Optimized PDF
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* CTA to builder */}
            <div className="text-center py-8 border-t border-border">
              <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm mb-3">
                Want to build a new resume from scratch with a professional template?
              </p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-700 transition-all shadow-md"
              >
                <Zap size={14} /> Open Resume Builder
              </Link>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!analysis && !analyzing && (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-slate-300" />
            </div>
            <p className="text-sm font-medium">Add your resume and a job description, then click Analyze.</p>
            <p className="text-xs mt-1">Results appear here with your match score, keywords, and optimized version.</p>
          </div>
        )}
      </main>

      {/* Hidden printable optimized resume for PDF export */}
      {optimizedText && (
        <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '794px' }}>
          {optimizedData ? (
            <ResumePreview data={optimizedData} id="optimized-pdf-content" />
          ) : (
            <div
              id="optimized-pdf-content"
              style={{
                background: '#fff',
                padding: '48px 52px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                color: '#0F172A',
                minHeight: '1056px',
                lineHeight: 1.7,
              }}
            >
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '11px' }}>
                {optimizedText}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
