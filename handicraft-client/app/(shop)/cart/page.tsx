'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { buildWhatsAppOrderMessage } from '@/lib/whatsapp'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  if (cartCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto text-accent-gold">
          <ShoppingBag size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold">Your gallery bag is empty</h2>
        <Link href="/shop" className="inline-block bg-primary-brown text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-colors">
          View Collection
        </Link>
      </div>
    )
  }

  const whatsappUrl = buildWhatsAppOrderMessage(cart, cartTotal + 45)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-serif font-bold mb-12">Your Collection</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 p-6 bg-white rounded-3xl border border-primary-brown/5 shadow-sm">
                <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-bg-cream">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow space-y-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-accent-gold">{item.category}</span>
                  <h3 className="text-lg font-serif font-bold italic">{item.name}</h3>
                  <p className="text-sm font-bold text-accent-red">${item.price}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center bg-bg-cream rounded-full px-3 py-1.5 border border-primary-brown/5">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-accent-gold"><Minus size={14} /></button>
                    <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-accent-gold"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-primary-brown/20 hover:text-accent-red transition-colors"><Trash2 size={20} /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <Link href="/shop" className="inline-flex items-center space-x-2 font-bold text-accent-gold hover:underline">
            <ArrowLeft size={18} /><span>Continue Shopping</span>
          </Link>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-primary-brown rounded-[2.5rem] p-10 text-white shadow-2xl sticky top-32">
            <h2 className="text-2xl font-serif font-bold mb-8">Summary</h2>
            <div className="space-y-6 text-sm mb-8">
              <div className="flex justify-between text-white/60">
                <span>Items Subtotal</span>
                <span className="font-bold text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Est. Export Shipping</span>
                <span className="font-bold text-white">$45.00</span>
              </div>
              <div className="border-t border-white/10 pt-6 flex justify-between">
                <span className="text-lg font-serif font-bold italic">Total</span>
                <span className="text-2xl font-bold text-accent-gold">${(cartTotal + 45).toFixed(2)}</span>
              </div>
            </div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full bg-accent-gold text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-primary-brown transition-all flex items-center justify-center space-x-3 mb-4 shadow-lg">
              <ShoppingBag size={14} />
              <span>Order via WhatsApp</span>
            </a>
            <p className="text-[10px] text-center text-white/40 uppercase tracking-widest font-bold">Buy Directly from Kathmandu Artisans</p>
          </div>
        </div>
      </div>
    </div>
  )
}