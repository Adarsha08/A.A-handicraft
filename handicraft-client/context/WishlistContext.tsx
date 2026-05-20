'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { PRODUCTS } from '@/lib/types'

interface WishlistContextType {
  wishlist: PRODUCTS[]
  wishlistCount: number
  toggleWishlist: (product: PRODUCTS) => void
  isInWishlist: (id: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<PRODUCTS[]>([])

  const wishlistCount = wishlist.length

  const toggleWishlist = (product: PRODUCTS) => {
    setWishlist(prev =>
      prev.find(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [...prev, product]
    )
  }

  const isInWishlist = (id: string) => wishlist.some(i => i.id === id)

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistCount, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}