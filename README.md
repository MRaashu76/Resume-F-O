# ResumeForge

**Build professional resumes with confidence.**

A modern, fully client-side resume builder built with React + Vite + Tailwind CSS. No backend, no database, no auth. Your data stays in your browser.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Styling
- **React Router 6** — Client-side routing
- **jsPDF + html2canvas** — PDF export
- **Lucide React** — Icons
- **localStorage** — Data persistence

---

## Features

- ✅ 3 professional resume templates (Modern, Minimal, Corporate)
- ✅ 8-step guided editor
- ✅ Live real-time preview with zoom controls
- ✅ ATS readiness score
- ✅ Resume strength tracker
- ✅ One-click PDF export
- ✅ Auto-save to localStorage
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ No account required, no data leaves your browser

---

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, Badge, etc.)
│   ├── builder/      # Step components + score panels
│   ├── preview/      # ResumePreview wrapper
│   └── templates/    # ModernTemplate, MinimalTemplate, CorporateTemplate
├── hooks/
│   └── useResumeData.js    # localStorage + CRUD operations
├── pages/
│   ├── LandingPage.jsx
│   └── BuilderPage.jsx
└── utils/
    ├── resumeData.js   # Default/sample data
    ├── scoring.js      # ATS score + resume strength logic
    └── pdfExport.js    # html2canvas + jsPDF export
```

---

## Deploy to Vercel

### Option 1 — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow prompts. Framework preset: **Vite**.

### Option 2 — Vercel Dashboard

1. Push this repo to GitHub / GitLab / Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Framework: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**

The `vercel.json` handles SPA routing so direct `/builder` URLs work correctly.

---

## Customization

**Add a template:** Create a new file in `src/components/templates/`, add it to `src/components/preview/ResumePreview.jsx`, and list it in `src/components/builder/TemplateStep.jsx`.

**Add a form step:** Create a component in `src/components/builder/`, add it to the `renderStep()` switch in `BuilderPage.jsx`, and update the `STEPS` array.

---

## Credits

- Built for [Digital Heroes](https://digitalheroesco.com)
- Created by: Aashish Kr. Das
- Contact: aashishkumards123@gmail.com

# Resume-F-O
