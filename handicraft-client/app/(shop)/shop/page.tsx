'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PRODUCTS_DATA, CATEGORIES, MATERIALS } from '@/lib/types'
import ProductCard from '@/components/shop/ProductCard'
import { SlidersHorizontal, Search, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Shop() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const activeCategory = searchParams.get('category') || 'All'
  const activeMaterial = searchParams.get('material') || 'All'
  const sortBy = searchParams.get('sort') || 'featured'

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'All') params.delete(key)
    else params.set(key, value)
    router.push(`/shop?${params.toString()}`)
  }

 const filteredProducts = useMemo(() => {
  return PRODUCTS_DATA.filter(product => {  // ← fixed: use PRODUCTS_DATA, parameter named product
    const matchCategory = activeCategory === 'All' || product.category.includes(activeCategory)
    const matchMaterial = activeMaterial === 'All' || product.material === activeMaterial
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchMaterial && matchSearch
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [activeCategory, activeMaterial, searchQuery, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold">The Marketplace</h1>
            <p className="text-primary-brown/60">Discover authentic handcrafted treasures from Kathmandu.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-brown/40" size={18} />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-primary-brown/10 rounded-full focus:outline-none focus:border-accent-gold text-sm" />
            </div>
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="lg:hidden p-3 bg-white border border-primary-brown/10 rounded-full">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 space-y-10 flex-shrink-0">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-brown/40">Categories</h3>
            {['All', ...CATEGORIES].map((cat) => (
              <button key={cat} onClick={() => updateFilter('category', cat)} className={`block w-full text-left text-sm py-1 transition-colors ${activeCategory === cat ? 'text-accent-gold font-bold' : 'hover:text-accent-gold'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-brown/40">Material</h3>
            {['All', ...MATERIALS].map((mat) => (
              <button key={mat} onClick={() => updateFilter('material', mat)} className="flex items-center space-x-3 group">
                <div className={`w-4 h-4 border rounded flex items-center justify-center transition-all ${activeMaterial === mat ? 'bg-accent-gold border-accent-gold' : 'border-primary-brown/20'}`}>
                  {activeMaterial === mat && <Check size={12} className="text-white" />}
                </div>
                <span className={`text-sm ${activeMaterial === mat ? 'font-bold' : 'text-primary-brown/70'}`}>{mat}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <main className="flex-grow space-y-8">
          <div className="flex justify-between items-center text-sm">
            <p className="text-primary-brown/40">Found {filteredProducts.length} items</p>
            <select value={sortBy} onChange={(e) => updateFilter('sort', e.target.value)} className="bg-transparent font-bold text-primary-brown cursor-pointer">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <h3 className="text-xl font-serif font-bold">No items found</h3>
              <button onClick={() => router.push('/shop')} className="text-accent-gold font-bold hover:underline">Reset filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}