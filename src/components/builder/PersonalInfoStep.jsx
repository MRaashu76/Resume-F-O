import React from 'react'
import { User, Mail, Phone, MapPin, Linkedin, Globe, Briefcase } from 'lucide-react'
import { Input } from '../ui'

export default function PersonalInfoStep({ data, onChange }) {
  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'e.g. Alex Morgan', icon: User, type: 'text' },
    { key: 'title', label: 'Professional Title', placeholder: 'e.g. Senior Software Engineer', icon: Briefcase, type: 'text' },
    { key: 'email', label: 'Email Address', placeholder: 'alex@example.com', icon: Mail, type: 'email' },
    { key: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', icon: Phone, type: 'tel' },
    { key: 'location', label: 'Location', placeholder: 'San Francisco, CA', icon: MapPin, type: 'text' },
    { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/yourname', icon: Linkedin, type: 'text' },
    { key: 'portfolio', label: 'Portfolio / Website', placeholder: 'yoursite.com', icon: Globe, type: 'text' },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map(({ key, label, placeholder, icon: Icon, type }) => (
          <div key={key} className={key === 'fullName' || key === 'title' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
              {label}
            </label>
            <div className="relative">
              <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                type={type}
                value={data[key] || ''}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                className="input-field pl-9"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
