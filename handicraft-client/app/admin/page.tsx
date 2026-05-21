'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, Edit2, Save, X, LogOut,
  Settings as SettingsIcon, Package, MessageSquare, Download
} from 'lucide-react'
import { CATEGORIES, MATERIALS, Product as STATIC_PRODUCTS, Product } from '@/lib/types'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '@/lib/api'

interface AppSettings {
  whatsappNumber: string
  contactEmail?: string
}

const emptyProduct: Partial<Product> = {
  name: '',
  category: CATEGORIES[0],
  price: 0,
  material: MATERIALS[0],
  description: '',
  culturalSignificance: '',
  images: ['https://picsum.photos/seed/newproduct/600/600'],
  stock: 10,
  rating: 5,
  isBestSeller: false,
  isExportQuality: true,
}

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<AppSettings>({ whatsappNumber: '9779800000000' })
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products')
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Product>>(emptyProduct)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) { router.push('/admin'); return }
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProduct = async () => {
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        rating: Number(form.rating),
        images: (form.images || []).filter(Boolean),
      }
      if (isEditingProduct) {
        await updateProduct(isEditingProduct, payload)
      } else {
        await createProduct(payload)
      }
      setIsEditingProduct(null)
      setForm(emptyProduct)
      loadProducts()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleImportStatic = async () => {
    if (!confirm('Import all static products into the database? This will create duplicates if already imported.')) return
    for (const prod of products) {
      const { id, ...prodData } = prod
      await createProduct(prodData)
    }
    loadProducts()
    alert('Import complete!')
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    await deleteProduct(id)
    loadProducts()
  }

  const handleSaveSettings = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings))
    alert('Settings saved!')
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  const set = (key: string, value: any) => setForm(prev => ({ ...prev, [key]: value }))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-bold italic">Dashboard</h1>
          <p className="text-primary-brown/60">A.A. Handicraft Admin Panel</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex bg-white p-1 rounded-full border border-primary-brown/10 shadow-sm">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2 ${
                activeTab === 'products' ? 'bg-primary-brown text-white' : 'hover:bg-primary-brown/5'
              }`}
            >
              <Package size={14} />
              <span>Inventory</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center space-x-2 ${
                activeTab === 'settings' ? 'bg-primary-brown text-white' : 'hover:bg-primary-brown/5'
              }`}
            >
              <SettingsIcon size={14} />
              <span>Config</span>
            </button>
          </div>

          {products.length === 0 && (
            <button
              onClick={handleImportStatic}
              title="Import Static Data"
              className="p-3 bg-accent-gold/10 text-accent-gold rounded-full hover:bg-accent-gold hover:text-white transition-all"
            >
              <Download size={20} />
            </button>
          )}

          <button
            onClick={handleLogout}
            className="p-3 bg-accent-red/10 text-accent-red rounded-full hover:bg-accent-red hover:text-white transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'products' ? (
          <motion.div
            key="products"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Add / Edit Form */}
            <div className="bg-white rounded-[2rem] p-8 border border-primary-brown/5 shadow-xl">
              <h3 className="text-xl font-serif font-bold mb-8 italic flex items-center space-x-2">
                {isEditingProduct
                  ? <><Edit2 size={20} className="text-accent-gold" /><span>Edit Artifact</span></>
                  : <><Plus size={24} className="text-accent-gold" /><span>Add New Artifact</span></>
                }
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Product Name</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                    placeholder="E.g. Stone Ganesh Statue" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Category</label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-gold/30">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Price (USD)</label>
                  <input type="number" value={form.price} onChange={e => set('price', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-gold/30" />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Description</label>
                  <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent-gold/30" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Material</label>
                  <select value={form.material} onChange={e => set('material', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-gold/30">
                    {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Stock</label>
                  <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-gold/30" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Rating (0–5)</label>
                  <input type="number" step="0.1" max="5" value={form.rating} onChange={e => set('rating', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-gold/30" />
                </div>

                <div className="space-y-2 lg:col-span-full">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Significance Note</label>
                  <input value={form.culturalSignificance} onChange={e => set('culturalSignificance', e.target.value)}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 font-serif italic text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                    placeholder="Explain the heritage value..." />
                </div>

                <div className="space-y-2 lg:col-span-full">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Image URL</label>
                  <input value={form.images?.[0] || ''} onChange={e => set('images', [e.target.value])}
                    className="w-full bg-primary-brown/5 border-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                    placeholder="https://..." />
                </div>

                <div className="lg:col-span-full flex items-center space-x-6 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={form.isBestSeller} onChange={e => set('isBestSeller', e.target.checked)}
                      className="rounded border-primary-brown/20 accent-accent-gold" />
                    <span className="text-xs font-bold uppercase tracking-widest">Mark as Best Seller</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={form.isExportQuality} onChange={e => set('isExportQuality', e.target.checked)}
                      className="rounded border-primary-brown/20 accent-accent-gold" />
                    <span className="text-xs font-bold uppercase tracking-widest">Export Ready</span>
                  </label>
                </div>

                <div className="lg:col-span-full flex justify-end space-x-4 pt-6 border-t border-primary-brown/5">
                  {isEditingProduct && (
                    <button onClick={() => { setIsEditingProduct(null); setForm(emptyProduct) }}
                      className="px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs border border-primary-brown/20 hover:bg-primary-brown/5 transition-colors flex items-center space-x-2">
                      <X size={14} /><span>Cancel</span>
                    </button>
                  )}
                  <button onClick={handleSaveProduct} disabled={saving}
                    className="bg-accent-gold text-white px-10 py-3 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 disabled:opacity-50">
                    <Save size={16} />
                    <span>{saving ? 'Saving...' : isEditingProduct ? 'Update Product' : 'Add Product'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-[2rem] border border-primary-brown/5 shadow-xl overflow-hidden">
              {loading ? (
                <p className="text-center py-16 text-primary-brown/40">Loading products...</p>
              ) : products.length === 0 ? (
                <p className="text-center py-16 text-primary-brown/40">No products yet. Add one above or import static data.</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-primary-brown/5">
                    <tr>
                      {['Product', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary-brown/40">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-brown/5">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-primary-brown/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <img src={p.images[0]} className="w-12 h-12 rounded-lg object-cover" alt={p.name} />
                            <div>
                              <p className="font-serif font-bold text-sm">{p.name}</p>
                              <p className="text-[10px] text-primary-brown/40">{p.material}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">{p.category}</td>
                        <td className="px-6 py-4 text-xs font-bold text-accent-red">${p.price}</td>
                        <td className="px-6 py-4 text-xs font-medium">{p.stock}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button onClick={() => { setIsEditingProduct(p.id); setForm(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                              className="p-2 hover:bg-accent-gold/10 text-accent-gold rounded-lg transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id)}
                              className="p-2 hover:bg-accent-red/10 text-accent-red rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl"
          >
            <div className="bg-white rounded-[2rem] p-10 border border-primary-brown/5 shadow-xl space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold italic">Contact Configuration</h3>
                <p className="text-sm text-primary-brown/60">
                  Update your store's primary contact channels. These will reflect immediately in the customer interface.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold flex items-center space-x-2">
                    <MessageSquare size={14} />
                    <span>WhatsApp Number (with Country Code)</span>
                  </label>
                  <input type="text" value={settings.whatsappNumber}
                    onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-primary-brown/5 border-none rounded-2xl px-6 py-5 text-xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
                    placeholder="9779800000000" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-brown/40">Help Center Email</label>
                  <input type="email" value={settings.contactEmail || ''}
                    onChange={e => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full bg-primary-brown/5 border-none rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
                    placeholder="info@aahandicraft.com" />
                </div>

                <button onClick={handleSaveSettings}
                  className="w-full bg-primary-brown text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95">
                  Save Configuration
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}