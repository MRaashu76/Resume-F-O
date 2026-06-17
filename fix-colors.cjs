const fs = require('fs')
const path = require('path')

const patterns = [
  // Red
  { match: /\bbg-red-50\b(?!\/)(?!\s+dark:)/g, replace: 'bg-red-50 dark:bg-red-900/20' },
  { match: /\btext-red-400\b(?!\/)(?!\s+dark:)/g, replace: 'text-red-400 dark:text-red-500' },
  { match: /\btext-red-500\b(?!\/)(?!\s+dark:)/g, replace: 'text-red-500 dark:text-red-400' },
  { match: /\btext-red-600\b(?!\/)(?!\s+dark:)/g, replace: 'text-red-600 dark:text-red-400' },
  { match: /\bborder-red-100\b(?!\/)(?!\s+dark:)/g, replace: 'border-red-100 dark:border-red-900/30' },
  { match: /\bborder-red-200\b(?!\/)(?!\s+dark:)/g, replace: 'border-red-200 dark:border-red-800/30' },
  
  // Green
  { match: /\bbg-green-50\b(?!\/)(?!\s+dark:)/g, replace: 'bg-green-50 dark:bg-green-900/20' },
  { match: /\btext-green-500\b(?!\/)(?!\s+dark:)/g, replace: 'text-green-500 dark:text-green-400' },
  { match: /\btext-green-600\b(?!\/)(?!\s+dark:)/g, replace: 'text-green-600 dark:text-green-400' },
  { match: /\btext-green-700\b(?!\/)(?!\s+dark:)/g, replace: 'text-green-700 dark:text-green-400' },
  { match: /\bborder-green-100\b(?!\/)(?!\s+dark:)/g, replace: 'border-green-100 dark:border-green-900/30' },
  { match: /\bborder-green-200\b(?!\/)(?!\s+dark:)/g, replace: 'border-green-200 dark:border-green-800/30' },

  // Amber/Yellow
  { match: /\bbg-amber-50\b(?!\/)(?!\s+dark:)/g, replace: 'bg-amber-50 dark:bg-amber-900/20' },
  { match: /\btext-amber-500\b(?!\/)(?!\s+dark:)/g, replace: 'text-amber-500 dark:text-amber-400' },
  { match: /\btext-amber-600\b(?!\/)(?!\s+dark:)/g, replace: 'text-amber-600 dark:text-amber-400' },
  { match: /\btext-amber-700\b(?!\/)(?!\s+dark:)/g, replace: 'text-amber-700 dark:text-amber-400' },
  { match: /\bborder-amber-100\b(?!\/)(?!\s+dark:)/g, replace: 'border-amber-100 dark:border-amber-900/30' },
  { match: /\btext-yellow-500\b(?!\/)(?!\s+dark:)/g, replace: 'text-yellow-500 dark:text-yellow-400' },

  // Blue
  { match: /\bbg-blue-50\b(?!\/)(?!\s+dark:)/g, replace: 'bg-blue-50 dark:bg-blue-900/20' },
  { match: /\btext-blue-400\b(?!\/)(?!\s+dark:)/g, replace: 'text-blue-400 dark:text-blue-500' },
  { match: /\btext-blue-500\b(?!\/)(?!\s+dark:)/g, replace: 'text-blue-500 dark:text-blue-400' },
  { match: /\btext-blue-700\b(?!\/)(?!\s+dark:)/g, replace: 'text-blue-700 dark:text-blue-400' },
  { match: /\bborder-blue-100\b(?!\/)(?!\s+dark:)/g, replace: 'border-blue-100 dark:border-blue-900/30' },
  { match: /\bborder-blue-200\b(?!\/)(?!\s+dark:)/g, replace: 'border-blue-200 dark:border-blue-800/30' },

  // Slate
  { match: /\btext-slate-400\b(?!\/)(?!\s+dark:)/g, replace: 'text-slate-400 dark:text-slate-500' },
  { match: /\bbg-slate-50\/50\b(?!\/)(?!\s+dark:)/g, replace: 'bg-slate-50/50 dark:bg-slate-800/30' },
  { match: /\bbg-slate-50\b(?!\/)(?!\s+dark:)/g, replace: 'bg-slate-50 dark:bg-slate-800/50' },
  { match: /\bborder-slate-300\b(?!\/)(?!\s+dark:)/g, replace: 'border-slate-300 dark:border-slate-700' },
]

function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('templates') && !fullPath.includes('preview')) {
        walk(fullPath)
      }
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      let changed = false
      for (const p of patterns) {
        if (content.match(p.match)) {
          content = content.replace(p.match, p.replace)
          changed = true
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content)
        console.log(`Updated ${fullPath}`)
      }
    }
  }
}

walk('./src/components')
walk('./src/pages')
