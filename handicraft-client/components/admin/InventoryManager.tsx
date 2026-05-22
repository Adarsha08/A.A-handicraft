'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, Save, X, Search, AlertTriangle, ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InventoryProps {
  products: any[]
  categories: any[]
  onSave: (product: any, id?: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

const defaultForm = {
  name: '',
  categoryId: '',
  price: 0,
  image: '',
  description: '',
  stock: 10,
  isBestSeller: false,
  isExportQuality: true
}

export default function InventoryManager({ products, categories, onSave, onDelete }: InventoryProps) {
  const [isEditingId, setIsEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [productForm, setProductForm] = useState(defaultForm)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEditTrigger = (prod: any) => {
    setIsEditingId(prod.id)
    setProductForm({
      name: prod.name,
      categoryId: prod.categoryId,
      price: prod.price,
      image: prod.image,
      description: prod.description,
      stock: prod.stock,
      isBestSeller: prod.isBestSeller,
      isExportQuality: prod.isExportQuality
    })
    setIsFormOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleResetForm = () => {
    setIsEditingId(null)
    setProductForm(defaultForm)
    setIsFormOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(productForm, isEditingId || undefined)
    handleResetForm()
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await onDelete(id)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-primary-brown/5 shadow-md">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-brown/35" size={18} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-primary-brown/5 border-none rounded-xl pl-12 pr-4 py-3 text-xs font-semibold focus:ring-1 focus:ring-accent-gold"
          />
        </div>
        <button
          onClick={() => { handleResetForm(); setIsFormOpen(!isFormOpen) }}
          className="w-full md:w-auto bg-accent-gold text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center space-x-2"
        >
          {isFormOpen ? <><X size={15} /><span>Cancel</span></> : <><Plus size={15} /><span>Add Product</span></>}
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-[2rem] p-8 border border-primary-brown/5 shadow-xl space-y-6">
              <h3 className="text-lg font-serif font-bold italic text-primary-brown">
                {isEditingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Product Name *</label>
                  <input required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 text-xs" placeholder="E.g. Bronze Statue" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Category</label>
                  <select value={productForm.categoryId} onChange={e => setProductForm({ ...productForm, categoryId: e.target.value })} className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 text-xs font-bold text-primary-brown/70">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Price (USD)</label>
                  <input required type="number" min={0} value={productForm.price} onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })} className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 text-xs" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Stock</label>
                  <input required type="number" min={0} value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: Number(e.target.value) })} className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 text-xs" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-brown/30" size={16} />
                    <input required value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} className="w-full bg-primary-brown/5 border-none rounded-xl pl-12 pr-4 py-3 text-xs" placeholder="https://..." />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Description *</label>
                  <textarea required rows={2} value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 text-xs resize-none" />
                </div>

                <div className="md:col-span-full flex flex-wrap gap-6 pt-4 border-t border-primary-brown/5">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={productForm.isBestSeller} onChange={e => setProductForm({ ...productForm, isBestSeller: e.target.checked })} className="rounded text-accent-gold w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Best Seller</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={productForm.isExportQuality} onChange={e => setProductForm({ ...productForm, isExportQuality: e.target.checked })} className="rounded text-accent-gold w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Export Quality</span>
                  </label>
                </div>

                <div className="md:col-span-full flex justify-end space-x-4 pt-4">
                  <button type="button" onClick={handleResetForm} className="px-6 py-3 rounded-full text-[10px] font-bold uppercase border border-primary-brown/20">Cancel</button>
                  <button type="submit" className="bg-primary-brown text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase flex items-center space-x-2">
                    <Save size={14} /><span>{isEditingId ? 'Update' : 'Save'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[2rem] border border-primary-brown/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary-brown/5 border-b border-primary-brown/10">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-brown/50">Product</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-brown/50">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-brown/50">Price</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-brown/50">Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-brown/50">Tags</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-brown/50 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-brown/5">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-20 text-xs text-primary-brown/40">No products found.</td></tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-primary-brown/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-primary-brown/5 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                        </div>
                        <p className="font-serif font-bold text-sm text-primary-brown">{p.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-primary-brown/70">{p.category?.name}</td>
                    <td className="px-6 py-4 text-xs font-black text-accent-red">${p.price}</td>
                    <td className="px-6 py-4 text-xs">
                      {p.stock === 0 ? (
                        <span className="flex items-center space-x-1 font-bold text-accent-red"><AlertTriangle size={14} /><span>DEPLETED</span></span>
                      ) : p.stock < 5 ? (
                        <span className="font-bold text-amber-600">{p.stock} units</span>
                      ) : (
                        <span className="font-bold text-emerald-600">{p.stock} units</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isBestSeller && <span className="bg-accent-gold/10 text-accent-gold text-[8px] font-bold px-2 py-0.5 rounded-full">Bestseller</span>}
                        {p.isExportQuality && <span className="bg-emerald-500/10 text-emerald-600 text-[8px] font-bold px-2 py-0.5 rounded-full">Export</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex space-x-1">
                        <button onClick={() => handleEditTrigger(p)} className="p-2 bg-accent-gold/10 text-accent-gold hover:bg-accent-gold hover:text-white rounded-xl transition-all"><Edit2 size={14} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 bg-accent-red/10 text-accent-red hover:bg-accent-red hover:text-white rounded-xl transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}