'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="pb-24">
      <div className="bg-primary-brown py-24 text-center">
        <span className="text-accent-gold uppercase tracking-[0.4em] font-bold text-sm">Get in Touch</span>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white italic mt-4">Visit us in Kathmandu</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-primary-brown/5">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-accent-gold p-12 lg:p-20 text-white space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold italic">Contact Information</h2>
                <p className="text-white/80 mt-2">We are located in the heart of Kathmandu's Thamel area.</p>
              </div>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin size={24} /></div>
                  <div><h4 className="font-bold uppercase tracking-widest text-xs">Our Shop</h4><p className="font-serif italic text-lg mt-1">Thamel Marg, Jyatha, Kathmandu, Nepal</p></div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><Phone size={24} /></div>
                  <div><h4 className="font-bold uppercase tracking-widest text-xs">Phone & WhatsApp</h4><p className="font-serif italic text-lg mt-1">+977 98XXXXXXX</p></div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><Clock size={24} /></div>
                  <div><h4 className="font-bold uppercase tracking-widest text-xs">Opening Hours</h4><p className="font-serif italic text-lg mt-1">Daily: 9:00 AM - 8:00 PM (NPT)</p></div>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-20">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                    <CheckCircle2 size={80} className="text-accent-gold" />
                    <h2 className="text-3xl font-serif font-bold italic">Dhanyabad! (Thank You)</h2>
                    <p className="text-primary-brown/60">Our team will respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                    <div>
                      <h2 className="text-3xl font-serif font-bold italic text-primary-brown">Send a Message</h2>
                      <p className="text-primary-brown/60 text-sm mt-2">Have an inquiry about export, bulk orders, or custom craft?</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Full Name</label>
                          <input required type="text" className="w-full bg-primary-brown/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent-gold/40" placeholder="Adarsha Gautam" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Email Address</label>
                          <input required type="email" className="w-full bg-primary-brown/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent-gold/40" placeholder="you@example.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-primary-brown/40">Your Message</label>
                        <textarea required rows={6} className="w-full bg-primary-brown/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent-gold/40 resize-none" placeholder="How can we help you?" />
                      </div>
                      <button type="submit" className="w-full bg-primary-brown text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-xl">
                        <Send size={18} /><span>Send Message</span>
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}