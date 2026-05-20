'use client'

import { motion } from 'framer-motion'
import { Award, Heart, Globe, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="space-y-32 pb-24">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-primary-brown">
        <div className="relative text-center space-y-6 px-4">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-accent-gold uppercase tracking-[0.4em] font-bold text-sm block">
            Since 1998
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-serif font-bold italic text-white">
            Our Heritage Story
          </motion.h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold italic text-accent-gold leading-tight">
              A.A. HANDICRAFT: <br />
              <span className="text-primary-brown">The Heart of Kathmandu's Art.</span>
            </h2>
            <div className="space-y-6 text-primary-brown/70 leading-relaxed">
              <p>Founded in the historic alleys of Jyatha, Kathmandu, A.A. HANDICRAFT began as a small family passion for preserving the waning traditional arts of the Newar community.</p>
              <p>For over 25 years, we have worked directly with master sculptors in Patan and weaving families in the Himalayan foothills to curate a collection that reflects the spiritual and cultural richness of Nepal.</p>
            </div>
            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-primary-brown/10">
              <div><Award className="text-accent-gold mb-3" size={32} /><h4 className="font-serif font-bold mb-1">Authenticity</h4><p className="text-xs text-primary-brown/60">Every piece is verified for craftsmanship and historical accuracy.</p></div>
              <div><Users className="text-accent-gold mb-3" size={32} /><h4 className="font-serif font-bold mb-1">Impact</h4><p className="text-xs text-primary-brown/60">Directly supporting over 50 artisan families in the Kathmandu valley.</p></div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <img src="/images/hero_handicraft.png" alt="Our Shop" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-brown py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Master Artisans", value: 25 },
              { label: "Export Countries", value: 40 },
              { label: "Artifacts Collected", value: 500 },
              { label: "Spiritual Years", value: 150 },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-4xl font-serif font-bold text-accent-gold">{stat.value}+</p>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <h2 className="text-4xl font-serif font-bold italic">Our Vision for Nepali Craft</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Heart, title: "Cultural Respect", desc: "Respecting the religious and spiritual roots of every deity and symbol we represent." },
            { icon: Globe, title: "Global Connection", desc: "Sharing the serenity of Himalayan art with homes and collectors worldwide." },
            { icon: Award, title: "Highest Standards", desc: "Maintaining export-level quality while keeping the 'soul' of the handmade alive." },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="p-10 bg-white rounded-3xl border border-primary-brown/5 shadow-sm space-y-6">
              <div className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center text-accent-gold mx-auto">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold">{item.title}</h3>
              <p className="text-sm text-primary-brown/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}