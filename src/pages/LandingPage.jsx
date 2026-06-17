import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Zap, Download, Eye, Shield, CheckCircle, FileText, Users, Code2, Palette,
  ChevronDown, ChevronUp, ArrowRight, Layers, Cpu, Star, Briefcase, GraduationCap,
  Globe, Menu, X, Sparkles, Sun, Moon
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-extrabold text-lg text-secondary tracking-tight">Resume-F&O</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {['Features', 'Templates', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors">
              {item}
            </a>
          ))}
          <Link
            to="/resume-optimizer"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-blue-700 dark:text-blue-400 transition-colors"
          >
            <Sparkles size={13} />
            Resume Optimizer
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/builder"
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Create Resume <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          {['Features', 'Templates', 'FAQ'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary py-1"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            to="/resume-optimizer"
            className="flex items-center gap-1.5 text-sm font-medium text-primary py-1"
            onClick={() => setOpen(false)}
          >
            <Sparkles size={13} /> Resume Optimizer
          </Link>
          <Link
            to="/builder"
            className="block w-full text-center bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-all"
            onClick={() => setOpen(false)}
          >
            Create Resume
          </Link>
        </div>
      )}
    </header>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface to-background text-secondary transition-colors pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-white/10 backdrop-blur border border-slate-200 dark:border-white/10 rounded-full px-4 py-1.5 text-sm font-medium text-primary dark:text-blue-200">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              100% Free · No sign-up required
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-secondary dark:text-white">
              Create{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                ATS-Friendly
              </span>{' '}
              Resumes Without the Complexity
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
              Design professional resumes, preview changes in real time, choose from modern templates, and export polished PDFs in minutes.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Create My Resume <ArrowRight size={16} />
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur text-slate-700 dark:text-white border border-slate-200 dark:border-white/20 px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-slate-50 dark:hover:bg-white/20 transition-all"
              >
                View Templates
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2">
              {[['No subscription', Shield], ['Instant PDF', Download], ['Live preview', Eye]].map(([label, Icon]) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">
                  <Icon size={13} className="text-blue-500 dark:text-blue-400 dark:text-blue-500 dark:text-blue-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Resume mockup */}
          <div className="relative hidden lg:flex items-center justify-center animate-slide-in-right">
            <div className="relative">
              {/* Main resume card */}
              <div className="w-72 h-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 rotate-1">
                {/* Sidebar */}
                <div className="flex h-full">
                  <div className="w-24 bg-slate-800 p-3 flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-400/30 mb-2" />
                    <div className="h-1.5 bg-blue-400/40 rounded w-full" />
                    <div className="h-1 bg-white/20 rounded w-4/5" />
                    <div className="h-1 bg-white/20 rounded w-3/5" />
                    <div className="mt-3">
                      <div className="h-1 bg-blue-400/40 rounded w-full mb-1.5" />
                      {['w-full','w-4/5','w-3/5','w-4/5'].map((w,i) => (
                        <div key={i} className={`h-1 bg-white/15 rounded ${w} mb-1`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-3 space-y-3">
                    <div className="space-y-1">
                      <div className="h-2 bg-slate-700 rounded w-3/4" />
                      <div className="h-1.5 bg-primary/60 rounded w-1/2" />
                    </div>
                    <div>
                      <div className="h-1 bg-primary/40 rounded w-full mb-1" />
                      {[3,2.5,3,2,2.5].map((s,i) => (
                        <div key={i} className={`h-0.5 bg-slate-200 dark:bg-slate-700 rounded mb-0.5`} style={{width:`${s*25}%`}} />
                      ))}
                    </div>
                    <div>
                      <div className="h-1 bg-primary/40 rounded w-4/5 mb-1" />
                      <div className="h-1.5 bg-slate-700 rounded w-full mb-0.5" />
                      <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-0.5" />
                      {[3,2.5,3,2].map((s,i) => (
                        <div key={i} className={`h-0.5 bg-slate-200 dark:bg-slate-700 rounded mb-0.5`} style={{width:`${s*25}%`}} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI badges */}
              <div className="absolute -top-4 -left-8 glass rounded-xl px-3 py-2 shadow-lg animate-float text-slate-800 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <Download size={13} className="text-primary" />
                  <span className="text-xs font-semibold">PDF Export</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 shadow-lg animate-float-delay text-slate-800 dark:text-slate-100">
                <div className="flex items-center gap-2">
                  <Eye size={13} className="text-green-500 dark:text-green-400" />
                  <span className="text-xs font-semibold">Live Preview</span>
                </div>
              </div>

              <div className="absolute top-16 -right-10 glass rounded-xl px-3 py-2 shadow-lg animate-float text-slate-800 dark:text-slate-100" style={{animationDelay:'0.5s'}}>
                <div className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-success" />
                  <span className="text-xs font-semibold">ATS Friendly</span>
                </div>
              </div>

              <div className="absolute bottom-16 -right-8 glass rounded-xl px-3 py-2 shadow-lg animate-float-delay text-slate-800 dark:text-slate-100" style={{animationDelay:'1.5s'}}>
                <div className="flex items-center gap-2">
                  <Layers size={13} className="text-purple-500" />
                  <span className="text-xs font-semibold">3 Templates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Templates ─────────────────────────────────────────────────────────────────
function Templates() {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      desc: 'Bold sidebar, blue accents, and a striking two-column layout. Great for tech and creative roles.',
      badge: 'Most Popular',
      badgeColor: 'bg-blue-100 text-blue-700 dark:text-blue-400',
      accent: '#2196F3',
      dark: '#0F172A',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      desc: 'Clean black-and-white layout that centers your content. Universally readable and timeless.',
      badge: 'ATS Optimized',
      badgeColor: 'bg-green-100 text-green-700 dark:text-green-400',
      accent: '#374151',
      dark: '#111827',
    },
    {
      id: 'corporate',
      name: 'Corporate',
      desc: 'Professional dark header with a structured two-column body. Built for business-facing roles.',
      badge: 'Business Ready',
      badgeColor: 'bg-purple-100 text-purple-700',
      accent: '#475569',
      dark: '#1E293B',
    },
  ]

  return (
    <section id="templates" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">Three Professional Templates</h2>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-lg max-w-xl mx-auto">Switch between templates instantly. Your data moves with you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="card overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              {/* Template preview */}
              <div className="h-52 bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center justify-center border-b border-border">
                <div className="w-36 h-44 rounded-lg shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="flex h-full">
                    {tpl.id === 'modern' && (
                      <>
                        <div style={{ background: tpl.dark, width: '35%' }} className="p-1.5 space-y-1">
                          <div className="w-5 h-5 rounded-full bg-white/20" />
                          <div className="h-0.5 rounded" style={{ background: tpl.accent }} />
                          {[1,2,3,4,5].map(i => <div key={i} className="h-0.5 bg-white/20 rounded" style={{width: `${70+i*4}%`}} />)}
                        </div>
                        <div className="flex-1 p-1.5 space-y-1.5">
                          <div className="h-1.5 rounded" style={{ background: tpl.dark }} />
                          <div className="h-0.5 rounded" style={{ background: tpl.accent }} />
                          <div className="h-px bg-slate-200 dark:bg-slate-700 rounded" style={{ background: tpl.accent, marginTop: 4, height: 1.5, borderRadius: 2 }} />
                          {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-0.5 bg-slate-200 dark:bg-slate-700 rounded" style={{width:`${50+i*6}%`}} />)}
                        </div>
                      </>
                    )}
                    {tpl.id === 'minimal' && (
                      <div className="w-full p-2 space-y-1.5">
                        <div className="h-2.5 rounded bg-slate-800 w-3/4" />
                        <div className="h-1 rounded bg-slate-400 w-1/2" />
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-1.5 space-y-1">
                          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-0.5 rounded bg-slate-200 dark:bg-slate-700" style={{width:`${45+i*6}%`}} />)}
                        </div>
                      </div>
                    )}
                    {tpl.id === 'corporate' && (
                      <div className="w-full">
                        <div style={{ background: tpl.dark }} className="p-2">
                          <div className="h-2 rounded bg-white dark:bg-slate-900 w-2/3 mb-1" />
                          <div className="h-0.5 rounded bg-white/30 w-1/2" />
                        </div>
                        <div className="p-2 flex gap-2">
                          <div className="flex-1 space-y-1">
                            {[1,2,3,4,5,6].map(i => <div key={i} className="h-0.5 rounded bg-slate-200 dark:bg-slate-700" />)}
                          </div>
                          <div className="w-10 space-y-1">
                            {[1,2,3,4].map(i => <div key={i} className="h-0.5 rounded bg-slate-200 dark:bg-slate-700" />)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-secondary">{tpl.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tpl.badgeColor}`}>{tpl.badge}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed mb-4">{tpl.desc}</p>
                <Link
                  to="/builder"
                  className="w-full flex items-center justify-center gap-2 border border-border text-secondary text-sm font-semibold py-2 rounded-xl hover:border-primary hover:text-primary hover:bg-blue-50 dark:bg-blue-900/20 transition-all"
                >
                  Use Template <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: Download, title: '100% Free', desc: 'Build and export resumes without subscriptions, paywalls, or hidden fees.' },
    { icon: Shield, title: 'Privacy First', desc: 'Your resume data stays in your browser. We don\'t collect or store anything.' },
    { icon: CheckCircle, title: 'ATS Friendly', desc: 'Clean layouts structured to pass applicant tracking systems without tricks.' },
    { icon: FileText, title: 'Instant PDF Export', desc: 'Download a professionally formatted PDF in one click, ready to send.' },
    { icon: Eye, title: 'Real-Time Preview', desc: 'Every keystroke updates your resume preview instantly on the right side.' },
    { icon: Sparkles, title: 'Resume Optimizer', desc: 'Upload any resume, paste a job description, and get a tailored, keyword-aligned version instantly.' },
  ]

  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">Why ResumeForge</h2>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-lg max-w-lg mx-auto">Everything you need to write a resume that gets interviews — nothing you don't.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-slate-900">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all">
                <Icon size={18} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-secondary mb-1.5">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Built For ─────────────────────────────────────────────────────────────────
function BuiltFor() {
  const profiles = [
    { icon: GraduationCap, label: 'Students', desc: 'Build your first resume before graduation.' },
    { icon: Star, label: 'Fresh Graduates', desc: 'Stand out in your first job search.' },
    { icon: Code2, label: 'Developers', desc: 'Showcase projects, skills, and technical depth.' },
    { icon: Palette, label: 'Designers', desc: 'A clean canvas that lets your work speak.' },
    { icon: ArrowRight, label: 'Career Switchers', desc: 'Reframe your experience for a new direction.' },
    { icon: Briefcase, label: 'Professionals', desc: 'Update your resume with a polished new look.' },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-surface to-background text-secondary transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-secondary dark:text-white">Built for Everyone</h2>
          <p className="text-slate-600 dark:text-slate-400 dark:text-slate-500 text-lg max-w-lg mx-auto">Whether you're just starting out or pivoting careers, ResumeForge meets you where you are.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {profiles.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-sm">
              <Icon size={20} className="text-primary dark:text-blue-400 dark:text-blue-500 dark:text-blue-400 mb-3" />
              <div className="font-bold text-secondary dark:text-white mb-1">{label}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Optimizer Promo ──────────────────────────────────────────────────────────
function OptimizerPromo() {
  const steps = [
    { n: '01', label: 'Upload Resume', desc: 'Paste your existing resume text or drop a .txt file.' },
    { n: '02', label: 'Paste Job Description', desc: 'Copy the full JD from any job board and paste it.' },
    { n: '03', label: 'Get Match Score', desc: 'See keyword match %, missing skills, and ATS readiness.' },
    { n: '04', label: 'Download Optimized', desc: 'Export the tailored, keyword-aligned version as a PDF.' },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-card to-surface border-y border-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
              <Sparkles size={14} />
              New Feature
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary dark:text-white leading-tight">
              Tailor your resume to any job in seconds
            </h2>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-lg leading-relaxed">
              The Resume Optimizer analyzes your existing resume against any job description — identifying missing keywords, skills gaps, and ATS issues — then generates an optimized version aligned to the role.
            </p>

            <ul className="space-y-3">
              {[
                'Match score vs. the job description',
                'Missing keyword and skill detection',
                'Rewritten summary and experience bullets',
                'Side-by-side original vs. optimized view',
                'One-click PDF download',
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle size={16} className="text-success flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/resume-optimizer"
              className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl text-base font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <Sparkles size={16} /> Try Resume Optimizer
            </Link>
          </div>

          {/* Right: visual mock */}
          <div className="hidden lg:block">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-xl overflow-hidden">
              {/* Mock header */}
              <div className="bg-slate-800 px-5 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-slate-400 dark:text-slate-500 text-xs ml-2 font-mono">resume-optimizer</span>
              </div>

              <div className="p-6 space-y-5">
                {/* Score row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Overall Match', val: 78, color: '#2196F3' },
                    { label: 'Keyword Match', val: 82, color: '#22C55E' },
                    { label: 'ATS Readiness', val: 91, color: '#22C55E' },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-border">
                      <div className="text-2xl font-extrabold" style={{ color }}>{val}%</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Missing keywords */}
                <div>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Missing Keywords</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['TypeScript', 'REST APIs', 'Agile', 'Docker', 'CI/CD', 'System Design'].map(kw => (
                      <span key={kw} className="text-xs px-2.5 py-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 dark:text-red-500 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-full font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggestion */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles size={13} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-primary mb-0.5">Optimized Summary Generated</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Senior engineer with 6 years building scalable systems. Proficient in TypeScript, REST APIs, and Agile delivery with a track record of shipping high-impact features...
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                  <div className="w-36 h-8 bg-primary/20 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Fill Your Information', desc: 'Enter your personal details, work history, education, skills, and projects through a simple guided form.' },
    { n: '02', title: 'Choose a Template', desc: 'Select from Modern, Minimal, or Corporate templates. Switch anytime — your data always stays intact.' },
    { n: '03', title: 'Download Your PDF', desc: 'Click Export PDF and get a perfectly formatted, ATS-ready resume file ready to attach to applications.' },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-lg">From blank page to finished resume in minutes.</p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white text-xl font-extrabold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/25 relative z-10">
                  {n}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link
            to="/builder"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Start Building Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  const faqs = [
    {
      q: 'Is ResumeForge free?',
      a: 'Yes, completely. There are no subscriptions, no premium tiers, and no paywalls. Every feature — including PDF export and all templates — is free.',
    },
    {
      q: 'Does my data leave my browser?',
      a: 'No. Your resume data is stored only in your browser\'s localStorage. We have no backend, no database, and no server that receives your personal information.',
    },
    {
      q: 'Can I export my resume as a PDF?',
      a: 'Yes. Click the "Export PDF" button at any time to download a professionally formatted PDF file. The exported file matches exactly what you see in the live preview.',
    },
    {
      q: 'Are the templates ATS-friendly?',
      a: 'All three templates use standard section headings, clean fonts, and structured layouts that applicant tracking systems can parse reliably. We avoid tables and graphics that confuse ATS parsers.',
    },
    {
      q: 'Can I use ResumeForge on mobile?',
      a: 'Yes. The builder is fully responsive. On mobile, the editor and preview stack vertically and you can toggle between them with the Preview button.',
    },
    {
      q: 'Will my progress be saved if I close the browser?',
      a: 'Yes. Your data is auto-saved to localStorage every time you make a change. When you return, the builder will restore your last session automatically.',
    },
  ]

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-lg">Answers to the most common questions.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-border rounded-2xl overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:bg-slate-800/50 transition-colors"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <span className="font-semibold text-secondary text-sm">{faq.q}</span>
                {openIdx === idx
                  ? <ChevronUp size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  : <ChevronDown size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                }
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-border pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-blue-700 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">Your next role starts with a strong resume.</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-lg mx-auto">Build yours in minutes — free, in your browser, with no account required.</p>
        <Link
          to="/builder"
          className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 text-primary px-8 py-4 rounded-2xl text-base font-bold hover:bg-blue-50 dark:bg-blue-900/20 transition-all shadow-xl hover:-translate-y-0.5"
        >
          Create My Resume <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 dark:text-slate-500 py-12 px-4 sm:px-6 border-t border-border transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-extrabold text-secondary dark:text-white">Resume-F&O</span>
            </div>
            <p className="text-sm leading-relaxed">Build professional resumes with confidence.</p>
          </div>

          <div>
            <h4 className="text-secondary dark:text-white font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><Link to="/builder" className="hover:text-white transition-colors">Create Resume</Link></li>
              <li><Link to="/resume-optimizer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Sparkles size={11} className="text-blue-400 dark:text-blue-500 dark:text-blue-400" /> Resume Optimizer
              </Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Info</h4>
            <ul className="space-y-2 text-sm">
              <li>No account required</li>
              <li>Data stays in your browser</li>
              <li>Free PDF export</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} ResumeForge. All rights reserved.</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
            <div className="text-slate-500 dark:text-slate-400 dark:text-slate-500">
              Created by: <span className="text-slate-300">Aashish Kr. Das</span> ·{' '}
              <a href="mailto:aashishkumards123@gmail.com" className="text-slate-300 hover:text-white transition-colors">aashishkumards123@gmail.com</a>
            </div>

            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
            >
              <Globe size={12} />
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Templates />
      <Features />
      <OptimizerPromo />
      <BuiltFor />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
