'use client'

import { useMemo } from 'react'
import { Package, DollarSign, Award, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

interface OverviewProps {
  products: any[]
  categories: any[]
}

export default function DashboardOverview({ products, categories }: OverviewProps) {
  const stats = useMemo(() => {
    const count = products.length
    let totalValue = 0
    let exportCount = 0
    let lowStockCount = 0

    products.forEach((p) => {
      totalValue += (p.price || 0) * (p.stock || 0)
      if (p.isExportQuality) exportCount++
      if ((p.stock || 0) < 5) lowStockCount++
    })

    const categoryMap: { [key: string]: number } = {}
    products.forEach((p) => {
      const cat = p.category?.name || 'Unknown'
      categoryMap[cat] = (categoryMap[cat] || 0) + 1
    })

    const categoryRatios = Object.entries(categoryMap).map(([name, val]) => ({
      name,
      count: val,
      percentage: Math.round((val / (count || 1)) * 100)
    })).sort((a, b) => b.count - a.count)

    return {
      count,
      totalValue,
      exportPercent: count ? Math.round((exportCount / count) * 100) : 0,
      lowStockCount,
      categoryRatios
    }
  }, [products])

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-primary-brown to-[#2B1B15] text-white p-8 sm:p-12 rounded-[2.5rem] shadow-lg">
        <span className="text-xs text-accent-gold font-bold uppercase tracking-[0.3em] bg-white/10 px-4 py-1.5 rounded-full">Artisan Ledger</span>
        <h2 className="text-3xl font-serif font-bold italic mt-4">Handicraft Business Insights</h2>
        <p className="text-sm text-white/75 mt-2">Monitor statistics, audit pricing metrics, and restock heritage artifacts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Package, title: 'Active Products', val: stats.count, color: 'text-accent-gold bg-accent-gold/10', details: 'Total products' },
          { icon: DollarSign, title: 'Portfolio Worth', val: `$${stats.totalValue.toLocaleString()}`, color: 'text-emerald-600 bg-emerald-500/10', details: 'Combined valuation' },
          { icon: ShieldCheck, title: 'Export Readiness', val: `${stats.exportPercent}%`, color: 'text-blue-600 bg-blue-500/10', details: 'Verified quality' },
          { icon: Award, title: 'Restock Urgency', val: stats.lowStockCount, color: stats.lowStockCount > 0 ? 'text-accent-red bg-accent-red/10' : 'text-neutral-500 bg-neutral-100', details: 'Items under 5 stock' },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-primary-brown/5 rounded-3xl p-6 shadow-md flex items-center space-x-5"
          >
            <div className={`p-4 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">{item.title}</p>
              <h4 className="text-2xl font-serif font-bold text-primary-brown mt-1">{item.val}</h4>
              <p className="text-[10px] text-primary-brown/50 mt-1">{item.details}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] p-8 border border-primary-brown/5 shadow-md space-y-6">
          <h3 className="font-serif font-bold text-base text-primary-brown pb-4 border-b border-primary-brown/5">Category Composition</h3>
          {stats.count === 0 ? (
            <p className="py-12 text-center text-sm text-primary-brown/40">No products yet.</p>
          ) : (
            <div className="space-y-4">
              {stats.categoryRatios.map((item, idx) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-serif font-bold text-primary-brown">
                    <span>{item.name}</span>
                    <span>{item.count} items ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-primary-brown/5 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${idx === 0 ? 'bg-accent-gold' : idx === 1 ? 'bg-primary-brown' : 'bg-primary-brown/40'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-primary-brown/5 shadow-md space-y-6">
          <h3 className="font-serif font-bold text-base text-primary-brown pb-4 border-b border-primary-brown/5">Categories ({categories.length})</h3>
          {categories.length === 0 ? (
            <p className="py-12 text-center text-sm text-primary-brown/40">No categories yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span key={cat.id} className="bg-accent-gold/10 text-accent-gold border border-accent-gold/20 font-bold uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full">
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}