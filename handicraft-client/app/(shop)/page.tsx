'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Truck, Globe, Award } from 'lucide-react'
import { PRODUCTS_DATA, CATEGORIES } from '@/lib/types'
import ProductCard from '@/components/shop/ProductCard'
import { useState, useEffect, useMemo } from 'react'

export default function Home() {
  const [dbProducts, setDbProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchProds = async () => {
  //     try {
  //       const data = await getProducts()
  //       if (data && data.length > 0) {
  //         setDbProducts(data)
  //       }
  //     } catch (err) {
  //       console.error('Failed to fetch home products:', err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchProds()
  // }, [])

  const products = dbProducts.length > 0 ? dbProducts : PRODUCTS_DATA
  const bestSellers = useMemo(() => products.filter((p) => p.isBestSeller).slice(0, 4), [products])

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_handicraft1.png"
            alt="Authentic Nepali Handicraft"
            fill
            className="object-fit brightness-[0.7]"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <div className="space-y-2">
              <span className="text-accent-gold uppercase tracking-[0.4em] font-bold text-sm">
                Directly from Kathmandu
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                Authentic Heritage <br />
                <span className="text-accent-gold italic">Handcrafted</span> with Love
              </h1>
            </div>
            <p className="text-lg text-white/80 leading-relaxed">
              Discover unique religious items, traditional jewelry, and exquisite wooden crafts meticulously
              created by veteran artisans from the heart of Nepal.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                href="/shop"
                className="bg-accent-gold hover:bg-yellow-600 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all flex items-center justify-center group"
              >
                Shop Collection
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all text-center"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <span className="text-accent-gold uppercase tracking-widest font-bold text-xs">Curated Collections</span>
            <h2 className="text-4xl font-serif font-bold">Discover Categories</h2>
          </div>
          <Link href="/shop" className="text-primary-brown font-bold flex items-center hover:text-accent-gold transition-colors">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((category, idx) => (
            <Link
              key={category}
              href={`/shop?category=${encodeURIComponent(category)}`}
              className="group text-center space-y-4"
            >
              <div className="aspect-square bg-white rounded-full p-6 border border-primary-brown/5 shadow-sm group-hover:shadow-md group-hover:border-accent-gold/30 transition-all flex items-center justify-center overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/cat${idx}/200/200`}
                  alt={category}
                  className="w-16 h-16 object-contain grayscale group-hover:grayscale-0 transition-all"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm font-serif font-bold tracking-wide uppercase group-hover:text-accent-gold transition-colors">
                {category}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-primary-brown py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-accent-gold uppercase tracking-widest font-bold text-xs">Most Loved Items</span>
            <h2 className="text-4xl font-serif font-bold text-white">Artisanal Masterpieces</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Our highly detailed statues and textiles are favored by collectors and spiritual practitioners worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <div key={product.id} className="bg-white/5 p-4 rounded-3xl backdrop-blur-sm border border-white/10">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-accent-gold uppercase tracking-widest font-bold text-xs">Our Commitment</span>
              <h2 className="text-4xl font-serif font-bold italic">
                Preserving Tradition, Empowering Artisans.
              </h2>
              <p className="text-primary-brown/70 leading-relaxed">
                A.A. HANDICRAFT isn't just a shop; it's a bridge between the ancient stone carvers, metal
                workers, and weavers of Kathmandu and the world.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: ShieldCheck, title: 'Authentic Quality', desc: '100% handmade in Nepal by certified veteran artisans.' },
                { icon: Globe, title: 'Global Shipping', desc: 'Export-ready packaging and worldwide secure delivery.' },
                { icon: Award, title: 'Museum Style', desc: 'Curated collection of high-end traditional artifacts.' },
                { icon: Truck, title: 'Artisan Direct', desc: 'Fair trade practice ensuring direct support to local families.' },
              ].map((item, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center text-accent-gold flex-shrink-0">
                    <item.icon size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-lg">{item.title}</h4>
                    <p className="text-xs text-primary-brown/60 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
              <img
                src="https://picsum.photos/seed/artisan/800/1000"
                alt="Artisan working"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-accent-gold p-8 rounded-3xl text-white max-w-[240px] shadow-xl">
              <span className="text-4xl font-serif font-bold">25+</span>
              <p className="text-sm font-medium uppercase tracking-widest mt-2">
                Years of Heritage in Kathmandu valley
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-accent-gold/10 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic">Join our Handicraft Collective</h2>
          <p className="text-primary-brown/70">
            Sign up for exclusive previews of new artisan collections and stories from Kathmandu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-white border border-primary-brown/10 px-6 py-4 rounded-full focus:outline-none focus:border-accent-gold"
            />
            <button className="bg-primary-brown text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      
    </div>
  )
}