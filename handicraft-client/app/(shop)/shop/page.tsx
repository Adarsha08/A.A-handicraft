'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from '@/components/shop/ProductCard'
import { SlidersHorizontal, Search, Check, Loader2 } from 'lucide-react'
import { useProducts, useCategories } from '@/hooks/fetchHooks'

export default function Shop() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const activeCategory = searchParams.get('category') || 'All'
  const sortBy = searchParams.get('sort') || 'featured'

  const { products, loading } = useProducts()
  const { categories } = useCategories()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'All') params.delete(key)
    else params.set(key, value)
    router.push(`/shop?${params.toString()}`)
  }

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = activeCategory === 'All' || product.category?.name === activeCategory
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })
  }, [products, activeCategory, searchQuery, sortBy])

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
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-primary-brown/10 rounded-full focus:outline-none focus:border-accent-gold text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 space-y-10 flex-shrink-0">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-brown/40">Categories</h3>
            {['All', ...categories.map(c => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilter('category', cat)}
                className={`block w-full text-left text-sm py-1 transition-colors ${activeCategory === cat ? 'text-accent-gold font-bold' : 'hover:text-accent-gold'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Grid */}
        <main className="flex-grow space-y-8">
          <div className="flex justify-between items-center text-sm">
            <p className="text-primary-brown/40">Found {filteredProducts.length} items</p>
            <select
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-transparent font-bold text-primary-brown cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="animate-spin text-accent-gold" size={40} />
              <p className="text-sm font-bold uppercase tracking-widest text-primary-brown/40">Loading Collection...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
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