'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '977XXXXXXXXX' // replace with actual number

export default function WhatsAppFloating() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste%20A.A.%20HANDICRAFT!%20I%20have%20a%20question%20about%20your%20products.`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <div className="absolute right-full mr-4 bg-white text-primary-brown px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-primary-brown/5">
        Chat with us
      </div>
      <MessageCircle size={28} className="fill-white" />
      <span className="absolute top-0 right-0 w-3 h-3 bg-accent-red rounded-full border-2 border-white animate-pulse"></span>
    </motion.a>
  )
}