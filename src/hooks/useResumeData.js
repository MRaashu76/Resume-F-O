import { useState, useEffect, useCallback } from 'react'
import { defaultResumeData } from '../utils/resumeData'

const STORAGE_KEY = 'resumeforge_data'

function deepMerge(defaults, saved) {
  const result = { ...defaults }
  for (const key in saved) {
    if (saved[key] !== null && typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
      result[key] = deepMerge(defaults[key] || {}, saved[key])
    } else {
      result[key] = saved[key]
    }
  }
  return result
}

export function useResumeData() {
  const [resumeData, setResumeDataRaw] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return deepMerge(defaultResumeData, parsed)
      }
    } catch (e) {
      console.error('Failed to load saved resume:', e)
    }
    return { ...defaultResumeData }
  })

  const [lastSaved, setLastSaved] = useState(null)
  const [hasSavedData, setHasSavedData] = useState(() => !!localStorage.getItem(STORAGE_KEY))

  const setResumeData = useCallback((updater) => {
    setResumeDataRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        setLastSaved(new Date())
        setHasSavedData(true)
      } catch (e) {
        console.error('Failed to save resume:', e)
      }
      return next
    })
  }, [])

  const updatePersonal = useCallback((field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }))
  }, [setResumeData])

  const updateSummary = useCallback((value) => {
    setResumeData(prev => ({ ...prev, summary: value }))
  }, [setResumeData])

  const updateTemplate = useCallback((template) => {
    setResumeData(prev => ({ ...prev, template }))
  }, [setResumeData])

  // Education CRUD
  const addEducation = useCallback((edu) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { ...edu, id: Date.now().toString() }]
    }))
  }, [setResumeData])

  const updateEducation = useCallback((id, edu) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...edu, id } : e)
    }))
  }, [setResumeData])

  const deleteEducation = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }))
  }, [setResumeData])

  // Experience CRUD
  const addExperience = useCallback((exp) => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...exp, id: Date.now().toString() }]
    }))
  }, [setResumeData])

  const updateExperience = useCallback((id, exp) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...exp, id } : e)
    }))
  }, [setResumeData])

  const deleteExperience = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }))
  }, [setResumeData])

  // Projects CRUD
  const addProject = useCallback((proj) => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { ...proj, id: Date.now().toString() }]
    }))
  }, [setResumeData])

  const updateProject = useCallback((id, proj) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...proj, id } : p)
    }))
  }, [setResumeData])

  const deleteProject = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }))
  }, [setResumeData])

  // Skills
  const addSkill = useCallback((skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills : [...prev.skills, skill]
    }))
  }, [setResumeData])

  const removeSkill = useCallback((skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }, [setResumeData])

  // Certifications CRUD
  const addCertification = useCallback((cert) => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { ...cert, id: Date.now().toString() }]
    }))
  }, [setResumeData])

  const updateCertification = useCallback((id, cert) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...cert, id } : c)
    }))
  }, [setResumeData])

  const deleteCertification = useCallback((id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }))
  }, [setResumeData])

  const clearResume = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setResumeDataRaw({ ...defaultResumeData })
    setHasSavedData(false)
    setLastSaved(null)
  }, [])

  return {
    resumeData,
    lastSaved,
    hasSavedData,
    updatePersonal,
    updateSummary,
    updateTemplate,
    addEducation, updateEducation, deleteEducation,
    addExperience, updateExperience, deleteExperience,
    addProject, updateProject, deleteProject,
    addSkill, removeSkill,
    addCertification, updateCertification, deleteCertification,
    clearResume,
  }
}
