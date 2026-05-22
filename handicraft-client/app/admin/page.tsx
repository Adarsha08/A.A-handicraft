'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, Edit2, Save, X, LogOut,
  Settings as SettingsIcon, Package, MessageSquare, Download
} from 'lucide-react'

import { CATEGORIES, MATERIALS, Product } from '@/lib/types'
import { useProducts } from "@/hooks/fetchHooks"
import {
  createProduct,
  updateProduct,
  deleteProduct
} from "@/lib/services/shopServices"

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

  const [settings, setSettings] = useState<AppSettings>({
    whatsappNumber: '9779800000000'
  })

  const [activeTab, setActiveTab] =
    useState<'products' | 'settings'>('products')

  const [isEditingProduct, setIsEditingProduct] =
    useState<string | null>(null)

  const [form, setForm] =
    useState<Partial<Product>>(emptyProduct)

  const [saving, setSaving] = useState(false)

  // ✅ ONLY SOURCE OF TRUTH
  const { products, loading, refetch } = useProducts()

  // 🔐 AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) router.push('/admin')
  }, [])

  // ─────────────────────────────
  // SAVE PRODUCT
  // ─────────────────────────────
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

      refetch() // ✅ refresh list
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  // ─────────────────────────────
  // DELETE PRODUCT
  // ─────────────────────────────
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure?')) return

    await deleteProduct(id)
    refetch()
  }

  // ─────────────────────────────
  // IMPORT STATIC
  // ─────────────────────────────
  const handleImportStatic = async () => {
    if (!confirm('Import all products?')) return

    for (const prod of products) {
      const { id, ...prodData } = prod
      await createProduct(prodData)
    }

    refetch()
    alert('Import complete!')
  }

  // ─────────────────────────────
  // SETTINGS
  // ─────────────────────────────
  const handleSaveSettings = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings))
    alert('Settings saved!')
  }

  // ─────────────────────────────
  // LOGOUT
  // ─────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  const set = (key: string, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }))

  // ─────────────────────────────
  // UI
  // ─────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex gap-3">

          {products.length === 0 && (
            <button onClick={handleImportStatic}>
              <Download />
            </button>
          )}

          <button onClick={handleLogout}>
            <LogOut />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">

        {activeTab === 'products' ? (
          <motion.div key="products">

            {/* FORM */}
            <div className="bg-white p-6 rounded-xl mb-8">

              <input
                placeholder="Product name"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />

              <button onClick={handleSaveProduct} disabled={saving}>
                <Save />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

            {/* LIST */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {products.map(p => (
                  <div key={p.id} className="flex justify-between">
                    <p>{p.name}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsEditingProduct(p.id)
                          setForm(p)
                        }}
                      >
                        <Edit2 />
                      </button>

                      <button onClick={() => handleDeleteProduct(p.id)}>
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        ) : (
          <motion.div key="settings">

            <input
              value={settings.whatsappNumber}
              onChange={e =>
                setSettings({
                  ...settings,
                  whatsappNumber: e.target.value
                })
              }
            />

            <button onClick={handleSaveSettings}>
              Save Settings
            </button>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}