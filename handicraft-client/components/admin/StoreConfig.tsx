'use client'

import { useState } from 'react'
import { Save, MessageSquare, Mail, MapPin, Plus, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface StoreConfigProps {
  categories: any[]
  onSave: (name: string, id?: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function StoreConfig({ categories, onSave, onDelete }: StoreConfigProps) {
  const [newCategory, setNewCategory] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return
    setSaving(true)
    await onSave(newCategory.trim())
    setNewCategory('')
    setSaving(false)
  }

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return
    await onSave(editingName.trim(), id)
    setEditingId(null)
    setEditingName('')
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this category? Products in this category will be affected.')) {
      await onDelete(id)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2rem] p-8 border border-primary-brown/5 shadow-md space-y-6">
        <h3 className="font-serif font-bold text-xl text-primary-brown pb-4 border-b border-primary-brown/5">Manage Categories</h3>

        <form onSubmit={handleAdd} className="flex gap-4">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name..."
            className="flex-grow bg-primary-brown/5 border-none rounded-xl px-4 py-3 text-xs font-semibold focus:ring-1 focus:ring-accent-gold"
          />
          <button type="submit" disabled={saving} className="bg-accent-gold text-white px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center space-x-2">
            <Plus size={14} /><span>Add</span>
          </button>
        </form>

        <div className="space-y-3">
          {categories.length === 0 ? (
            <p className="text-center py-8 text-sm text-primary-brown/40">No categories yet. Add one above.</p>
          ) : (
            categories.map((cat) => (
              <motion.div key={cat.id} layout className="flex items-center justify-between p-4 bg-primary-brown/5 rounded-2xl">
                {editingId === cat.id ? (
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-grow bg-white border-none rounded-xl px-4 py-2 text-xs font-semibold mr-4 focus:ring-1 focus:ring-accent-gold"
                    autoFocus
                  />
                ) : (
                  <span className="font-serif font-bold text-sm text-primary-brown">{cat.name}</span>
                )}
                <div className="flex space-x-2">
                  {editingId === cat.id ? (
                    <>
                      <button onClick={() => handleUpdate(cat.id)} className="p-2 bg-accent-gold text-white rounded-xl"><Save size={14} /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 bg-primary-brown/10 rounded-xl"><span className="text-xs">✕</span></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditingId(cat.id); setEditingName(cat.name) }} className="p-2 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold hover:text-white rounded-xl transition-all"><Save size={14} /></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 bg-accent-red/10 text-accent-red hover:bg-accent-red hover:text-white rounded-xl transition-all"><Trash2 size={14} /></button>
                    </>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}