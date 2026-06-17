import React, { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import { Button } from '../ui'

export default function ListEditor({ items, onAdd, onUpdate, onDelete, renderForm, renderPreview, emptyText, addLabel }) {
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})
  const [isAdding, setIsAdding] = useState(false)

  const startAdd = () => {
    setFormData({})
    setEditingId(null)
    setIsAdding(true)
  }

  const startEdit = (item) => {
    setFormData({ ...item })
    setEditingId(item.id)
    setIsAdding(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({})
    setIsAdding(false)
  }

  const handleSave = () => {
    if (isAdding) {
      onAdd(formData)
    } else {
      onUpdate(editingId, formData)
    }
    cancelEdit()
  }

  const handleDelete = (id) => {
    if (window.confirm('Remove this entry?')) {
      onDelete(id)
      if (editingId === id) cancelEdit()
    }
  }

  const isEditing = editingId !== null || isAdding

  return (
    <div className="space-y-3">
      {/* Existing items */}
      {items.length === 0 && !isAdding && (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
          {emptyText || 'No entries yet. Click below to add one.'}
        </div>
      )}

      {items.map((item) => (
        <div key={item.id} className={`border rounded-xl overflow-hidden transition-all ${editingId === item.id ? 'border-primary shadow-sm' : 'border-border'}`}>
          {editingId === item.id ? (
            <div className="p-4 space-y-3">
              {renderForm(formData, setFormData)}
              <div className="flex gap-2 pt-1">
                <Button size="sm" onClick={handleSave}>Save</Button>
                <Button size="sm" variant="secondary" onClick={cancelEdit}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="p-4 flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                {renderPreview(item)}
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-primary hover:bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors"
                  aria-label="Edit"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:text-red-400 hover:bg-red-50 dark:bg-red-900/20 rounded-lg transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add form */}
      {isAdding && (
        <div className="border border-primary rounded-xl p-4 space-y-3 shadow-sm">
          {renderForm(formData, setFormData)}
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={handleSave}>Add Entry</Button>
            <Button size="sm" variant="secondary" onClick={cancelEdit}>Cancel</Button>
          </div>
        </div>
      )}

      {!isEditing && (
        <button
          onClick={startAdd}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-primary border-2 border-dashed border-blue-200 dark:border-blue-800/30 rounded-xl hover:bg-blue-50 dark:bg-blue-900/20 hover:border-primary transition-all"
        >
          <Plus size={15} />
          {addLabel || 'Add Entry'}
        </button>
      )}
    </div>
  )
}
