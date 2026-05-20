'use client'

import { use, useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Star, ShieldCheck, Truck, RotateCcw, Share2, Plus, Minus, Maximize2 } from 'lucide-react'
import { PRODUCTS_DATA } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { WHATSAPP_NUMBER } from '@/lib/whatsapp'
import ProductCard from '@/components/shop/ProductCard'

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const product = PRODUCTS_DATA.find((p) => p.id === id)
  const isFavorited = product ? isInWishlist(product.id) : false
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return PRODUCTS_DATA.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-serif font-bold">Product not found</h2>
        <Link href="/shop" className="text-accent-gold font-bold hover:underline">Back to Shop</Link>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <div className="bg-primary-brown/5 py-4 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-brown/40">
            <Link href="/" className="hover:text-primary-brown">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary-brown">Shop</Link>
            <span>/</span>
            <span className="text-primary-brown truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-square rounded-[2rem] overflow-hidden bg-white border border-primary-brown/5 shadow-inner group cursor-zoom-in" onClick={() => setIsZoomed(!isZoomed)}>
              <img src={product.images[0]} alt={product.name} className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`} />
              <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={16} className="text-primary-brown" />
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-accent-gold uppercase tracking-[0.2em] font-bold text-xs">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">{product.name}</h1>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-accent-gold text-accent-gold" : "text-primary-brown/10"} />
                  ))}
                </div>
                <span className="text-xs bg-accent-gold/10 text-accent-gold px-3 py-1 rounded-full font-bold">In Stock</span>
              </div>
              <p className="text-3xl font-bold text-accent-red">${product.price}</p>
            </div>

            <p className="text-primary-brown/70 leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-3 p-4 bg-white border border-primary-brown/5 rounded-2xl">
                <span className="text-primary-brown/40">Material:</span>
                <span className="font-bold">{product.material}</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white border border-primary-brown/5 rounded-2xl">
                <span className="text-primary-brown/40">Origin:</span>
                <span className="font-bold">Kathmandu, NP</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <div className="flex items-center bg-white border border-primary-brown/10 rounded-full px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-primary-brown/5 rounded-full"><Minus size={16} /></button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-primary-brown/5 rounded-full"><Plus size={16} /></button>
              </div>
              <button onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product) }} className="flex-grow bg-primary-brown text-white rounded-full font-bold uppercase tracking-widest py-4 hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-lg">
                <ShoppingBag size={20} /><span>Add to Cart</span>
              </button>
            </div>

            <div className="flex space-x-4 pt-2">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Namaste! I'm interested in the "${product.name}". Could you tell me more?`)}`} target="_blank" rel="noreferrer" className="flex-grow border-2 border-accent-gold text-accent-gold rounded-full font-bold uppercase tracking-widest py-4 hover:bg-accent-gold hover:text-white transition-all flex items-center justify-center space-x-3">
                <Share2 size={20} /><span>Inquire on WhatsApp</span>
              </a>
              <button onClick={() => toggleWishlist(product)} className={`p-4 rounded-full border transition-all duration-300 ${isFavorited ? 'bg-accent-red border-accent-red text-white' : 'border-primary-brown/10 text-accent-red'}`}>
                <Heart size={24} className={isFavorited ? 'fill-white' : ''} />
              </button>
            </div>

            <div className="pt-10 border-t border-primary-brown/10 space-y-6">
              <div>
                <h4 className="font-serif font-bold text-lg italic text-accent-gold">Artisan's Note</h4>
                <p className="text-sm text-primary-brown/60 italic leading-relaxed">"{product.culturalSignificance}"</p>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-bold"><Truck size={18} className="text-accent-gold" /><span>Secure Shipping</span></div>
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-bold"><ShieldCheck size={18} className="text-accent-gold" /><span>Certified</span></div>
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-bold"><RotateCcw size={18} className="text-accent-gold" /><span>30-Day Guarantee</span></div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold italic">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}