'use client'

import Link from 'next/link'
import { useWishlist } from '@/context/WishlistContext'
import { Heart, ArrowLeft } from 'lucide-react'
import ProductCard from '@/components/shop/ProductCard'

export default function Wishlist() {
  const { wishlist, wishlistCount } = useWishlist()

  if (wishlistCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-8">
        <div className="w-24 h-24 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto text-accent-red">
          <Heart size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold">Your wishlist is empty</h2>
        <Link href="/shop" className="inline-block bg-primary-brown text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-colors">
          View Collection
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold">My Wishlist</h1>
          <p className="text-primary-brown/60">You have saved {wishlistCount} items.</p>
        </div>
        <Link href="/shop" className="inline-flex items-center space-x-2 font-bold text-accent-gold hover:underline">
          <ArrowLeft size={18} /><span>Continue Shopping</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}