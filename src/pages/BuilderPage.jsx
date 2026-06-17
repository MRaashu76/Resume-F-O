import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Download, Eye, EyeOff, ChevronLeft, ChevronRight, RotateCcw, Check, Zap, Loader2, ArrowLeft, ZoomIn, ZoomOut, Sparkles, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useResumeData } from '../hooks/useResumeData'
import { exportToPDF } from '../utils/pdfExport'
import ResumePreview from '../components/preview/ResumePreview'
import ATSScorePanel from '../components/builder/ATSScorePanel'
import ResumeStrengthPanel from '../components/builder/ResumeStrengthPanel'
import PersonalInfoStep from '../components/builder/PersonalInfoStep'
import SummaryStep from '../components/builder/SummaryStep'
import EducationStep from '../components/builder/EducationStep'
import ExperienceStep from '../components/builder/ExperienceStep'
import ProjectsStep from '../components/builder/ProjectsStep'
import SkillsStep from '../components/builder/SkillsStep'
import CertificationsStep from '../components/builder/CertificationsStep'
import TemplateStep from '../components/builder/TemplateStep'

const STEPS = [
  { id: 1, label: 'Personal', shortLabel: 'Info' },
  { id: 2, label: 'Summary', shortLabel: 'Summary' },
  { id: 3, label: 'Education', shortLabel: 'Education' },
  { id: 4, label: 'Experience', shortLabel: 'Experience' },
  { id: 5, label: 'Projects', shortLabel: 'Projects' },
  { id: 6, label: 'Skills', shortLabel: 'Skills' },
  { id: 7, label: 'Certifications', shortLabel: 'Certs' },
  { id: 8, label: 'Template', shortLabel: 'Template' },
]

export default function BuilderPage() {
  const { theme, toggleTheme } = useTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [zoom, setZoom] = useState(0.55)
  const {
    resumeData,
    lastSaved,
    updatePersonal,
    updateSummary,
    updateTemplate,
    addEducation, updateEducation, deleteEducation,
    addExperience, updateExperience, deleteExperience,
    addProject, updateProject, deleteProject,
    addSkill, removeSkill,
    addCertification, updateCertification, deleteCertification,
    clearResume,
  } = useResumeData()

  const handleExport = async () => {
    setExporting(true)
    const name = resumeData.personal?.fullName?.replace(/\s+/g, '_') || 'Resume'
    const success = await exportToPDF('resume-export', `${name}_Resume.pdf`)
    setExporting(false)
    if (success) {
      setExportSuccess(true)
      setTimeout(() => setExportSuccess(false), 2500)
    }
  }

  const handleClear = () => {
    if (window.confirm('Clear all resume data and start fresh?')) {
      clearResume()
      setCurrentStep(1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep data={resumeData.personal} onChange={updatePersonal} />
      case 2: return <SummaryStep data={resumeData.summary} onChange={updateSummary} />
      case 3: return <EducationStep data={resumeData.education} onAdd={addEducation} onUpdate={updateEducation} onDelete={deleteEducation} />
      case 4: return <ExperienceStep data={resumeData.experience} onAdd={addExperience} onUpdate={updateExperience} onDelete={deleteExperience} />
      case 5: return <ProjectsStep data={resumeData.projects} onAdd={addProject} onUpdate={updateProject} onDelete={deleteProject} />
      case 6: return <SkillsStep data={resumeData.skills} onAdd={addSkill} onRemove={removeSkill} />
      case 7: return <CertificationsStep data={resumeData.certifications} onAdd={addCertification} onUpdate={updateCertification} onDelete={deleteCertification} />
      case 8: return <TemplateStep selected={resumeData.template} onSelect={updateTemplate} />
      default: return null
    }
  }

  const progressPct = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top bar */}
      <header className="flex-shrink-0 h-14 bg-card border-b border-border flex items-center px-4 gap-3 z-10">
        <Link to="/" className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-secondary transition-colors mr-1">
          <ArrowLeft size={16} />
          <span className="text-sm hidden sm:inline">Back</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-bold text-secondary text-sm hidden sm:inline">Resume-F&O</span>
        </div>

        <div className="flex-1 mx-2 hidden md:block">
          <div className="max-w-xs">
            <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mb-1">
              <span>Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].label}</span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          {lastSaved && (
            <span className="text-xs text-slate-400 dark:text-slate-500 hidden lg:flex items-center gap-1">
              <Check size={11} className="text-success" /> Saved
            </span>
          )}

          <button
            onClick={() => setShowPreview(p => !p)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-secondary border border-border px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:bg-slate-800/50 transition-all md:hidden"
          >
            {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
            {showPreview ? 'Editor' : 'Preview'}
          </button>

          <button
            onClick={handleClear}
            className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-red-500 dark:text-red-400 border border-border px-3 py-1.5 rounded-lg hover:bg-red-50 dark:bg-red-900/20 transition-all flex items-center gap-1.5 hidden sm:flex"
          >
            <RotateCcw size={12} />
            <span className="hidden lg:inline">Clear</span>
          </button>

          <Link
            to="/resume-optimizer"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-all"
          >
            <Sparkles size={12} />
            <span className="hidden lg:inline">Optimizer</span>
          </Link>

          <button
            onClick={handleExport}
            disabled={exporting}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              exportSuccess
                ? 'bg-success text-white'
                : 'bg-primary text-white hover:bg-blue-600 shadow-sm'
            } disabled:opacity-70`}
          >
            {exporting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : exportSuccess ? (
              <Check size={14} />
            ) : (
              <Download size={14} />
            )}
            <span className="hidden sm:inline">{exportSuccess ? 'Saved!' : 'Export PDF'}</span>
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor panel */}
        <div className={`${showPreview ? 'hidden' : 'flex'} md:flex flex-col w-full md:w-[38%] lg:w-[35%] border-r border-border bg-white dark:bg-slate-900 overflow-y-auto`}>
          {/* Step tabs */}
          <div className="flex-shrink-0 px-4 pt-4">
            {/* Mobile step selector */}
            <div className="flex items-center justify-between mb-4 md:hidden">
              <span className="text-sm font-semibold text-secondary">Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].label}</span>
              <div className="h-1.5 flex-1 mx-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {/* Step pills - desktop */}
            <div className="hidden md:flex flex-wrap gap-1 mb-4">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                    currentStep === step.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-secondary hover:bg-slate-100 dark:bg-slate-800'
                  }`}
                >
                  {step.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="flex-1 px-4 pb-4">
            <div className="mb-4">
              <h2 className="text-base font-bold text-secondary">{STEPS[currentStep - 1].label}</h2>
            </div>
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex-shrink-0 border-t border-border p-4 flex justify-between gap-3">
            <button
              onClick={() => setCurrentStep(s => Math.max(1, s - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors px-4 py-2 rounded-xl hover:bg-slate-100 dark:bg-slate-800"
            >
              <ChevronLeft size={15} /> Previous
            </button>
            {currentStep < STEPS.length ? (
              <button
                onClick={() => setCurrentStep(s => Math.min(STEPS.length, s + 1))}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-primary px-5 py-2 rounded-xl hover:bg-blue-600 transition-all shadow-sm"
              >
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center gap-1.5 text-sm font-semibold text-white bg-success px-5 py-2 rounded-xl hover:bg-green-600 transition-all shadow-sm"
              >
                <Download size={15} /> Export PDF
              </button>
            )}
          </div>
        </div>

        {/* Preview panel */}
        <div className={`${showPreview ? 'flex' : 'hidden'} md:flex flex-col flex-1 overflow-hidden bg-slate-100 dark:bg-slate-800`}>
          {/* Preview toolbar */}
          <div className="flex-shrink-0 h-10 bg-white dark:bg-slate-900 border-b border-border flex items-center px-4 gap-3">
            <Eye size={13} className="text-slate-400 dark:text-slate-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">Live Preview</span>
            <div className="flex-1" />

            {/* Sidebar panels */}
            <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mr-2">
              <span>ATS & Strength panels on left</span>
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom(z => Math.max(0.3, z - 0.05))}
                className="p-1 hover:bg-slate-100 dark:bg-slate-800 rounded transition-colors text-slate-500 dark:text-slate-400 dark:text-slate-500"
              >
                <ZoomOut size={13} />
              </button>
              <span className="text-xs text-slate-400 dark:text-slate-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom(z => Math.min(1, z + 0.05))}
                className="p-1 hover:bg-slate-100 dark:bg-slate-800 rounded transition-colors text-slate-500 dark:text-slate-400 dark:text-slate-500"
              >
                <ZoomIn size={13} />
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Score panels */}
            <div className="hidden xl:flex flex-col w-56 flex-shrink-0 border-r border-border bg-white dark:bg-slate-900 overflow-y-auto">
              <div className="p-4 border-b border-border">
                <ATSScorePanel data={resumeData} />
              </div>
              <div className="p-4">
                <ResumeStrengthPanel data={resumeData} />
              </div>
            </div>

            {/* Resume canvas */}
            <div className="flex-1 overflow-auto p-6 flex justify-center">
              <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                <ResumePreview data={resumeData} id="resume-preview" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden full-size export element */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, width: '794px' }}>
        <ResumePreview data={resumeData} id="resume-export" />
      </div>
    </div>
  )
}
