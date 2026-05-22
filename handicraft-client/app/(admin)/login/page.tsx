'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { Lock, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const { login } = useAdminAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center max-w-md mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-primary-brown/5 rounded-[2.5rem] p-10 shadow-2xl space-y-8 flex flex-col items-center w-full"
      >
        <div className="w-20 h-20 bg-primary-brown/5 rounded-full flex items-center justify-center">
          <Lock size={36} className="text-primary-brown" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-serif font-bold text-primary-brown">Admin Portal</h1>
          <p className="text-xs text-primary-brown/65 leading-relaxed">
            Secure access for A.A. HANDICRAFT administrators.
          </p>
        </div>

        {error && (
          <p className="text-xs text-accent-red font-bold bg-accent-red/10 px-4 py-2 rounded-full w-full">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-primary-brown/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent-gold/40 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-primary-brown/5 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent-gold/40 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-brown text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center space-x-3"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Login to Dashboard</span>}
          </button>
        </form>
      </motion.div>
    </div>
  )
}