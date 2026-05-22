'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminSidebar from '@/components/admin/AdminSidebar'
import DashboardOverview from '@/components/admin/DashboardOverview'
import InventoryManager from '@/components/admin/InventoryManager'
import StoreConfig from '@/components/admin/StoreConfig'

type Tab = 'overview' | 'products' | 'categories' | 'settings'

export default function Dashboard() {
  const { admin, accessToken, logout } = useAdminAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!admin && !localStorage.getItem('accessToken')) {
      router.push('/login')
    }
  }, [admin])

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = accessToken || localStorage.getItem('accessToken')
      const [prodsRes, catsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shop/categories`)
      ])
      const prods = await prodsRes.json()
      const cats = await catsRes.json()
      setProducts(prods)
      setCategories(cats)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken || localStorage.getItem('accessToken')}`
  })

  // ── Product Handlers ──
  const handleSaveProduct = async (data: any, id?: string) => {
    const url = id
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`
    const method = id ? 'PUT' : 'POST'
    await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(data) })
    await fetchData()
  }

  const handleDeleteProduct = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    await fetchData()
  }

  // ── Category Handlers ──
  const handleSaveCategory = async (name: string, id?: string) => {
    const url = id
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories`
    const method = id ? 'PUT' : 'POST'
    await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify({ name }) })
    await fetchData()
  }

  const handleDeleteCategory = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    await fetchData()
  }

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-accent-gold" size={32} />
        <p className="text-xs font-bold uppercase tracking-widest text-primary-brown/40">Loading Dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <div className="lg:col-span-1 h-fit lg:sticky lg:top-28">
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            admin={admin}
            logout={logout}
          />
        </div>

        <div className="lg:col-span-3 min-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <DashboardOverview products={products} categories={categories} />
              )}
              {activeTab === 'products' && (
                <InventoryManager
                  products={products}
                  categories={categories}
                  onSave={handleSaveProduct}
                  onDelete={handleDeleteProduct}
                />
              )}
              {activeTab === 'categories' && (
                <StoreConfig
                  categories={categories}
                  onSave={handleSaveCategory}
                  onDelete={handleDeleteCategory}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}