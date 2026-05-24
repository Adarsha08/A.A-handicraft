"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, Eye, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-cream rounded-2xl mb-4">
        {/* Badge */}
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 z-10 bg-accent-gold text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">
            Best Seller
          </span>
        )}

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isFavorited
              ? "bg-accent-red text-white"
              : "bg-white/80 text-primary-brown hover:bg-white"
          }`}
        >
          <Heart size={18} className={isFavorited ? "fill-white" : ""} />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button
            onClick={() => addToCart(product)}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-brown hover:bg-accent-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            <ShoppingBag size={20} />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-brown hover:bg-accent-gold hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <p className="text-[10px] uppercase tracking-wider text-accent-gold font-bold">
            {product.category?.name}
          </p>
          <div className="flex items-center text-[10px] text-primary-brown/60">
            <Star
              size={10}
              className="fill-accent-gold text-accent-gold mr-1"
            />
          </div>
        </div>
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-serif font-bold group-hover:text-accent-gold transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-bold text-accent-red">${product.price}</p>
      </div>
    </motion.div>
  );
}
