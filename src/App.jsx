import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import BuilderPage from './pages/BuilderPage'
import ResumeOptimizerPage from './pages/ResumeOptimizerPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/resume-optimizer" element={<ResumeOptimizerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
