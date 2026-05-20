'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu, X, Heart, Globe } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState('EN')

  // TODO: replace with actual cart/wishlist context
  const cartCount = 0
  const wishlistCount = 0

  return (
    <nav className="sticky top-0 z-50 bg-bg-cream/80 backdrop-blur-md border-b border-primary-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span className="text-2xl font-serif font-bold tracking-widest text-primary-brown">A.A. HANDICRAFT</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent-gold font-sans font-semibold">Kathmandu • Nepal</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="text-sm font-medium uppercase tracking-wider hover:text-accent-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <button
              onClick={() => setLang(lang === 'EN' ? 'NP' : 'EN')}
              className="hidden lg:flex items-center space-x-1 text-[10px] font-bold border border-primary-brown/10 px-2 py-1 rounded hover:bg-primary-brown hover:text-white transition-all"
            >
              <Globe size={12} />
              <span>{lang}</span>
            </button>
            <button className="hidden sm:block p-2 hover:text-accent-gold transition-colors">
              <Search size={20} />
            </button>
            <Link href="/wishlist" className="p-2 hover:text-accent-gold transition-colors relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="p-2 hover:text-accent-gold transition-colors relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent-red text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-primary-brown/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block px-3 py-4 text-base font-medium uppercase tracking-widest hover:bg-primary-brown/5 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}