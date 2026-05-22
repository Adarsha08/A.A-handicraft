// hooks/useAdmins.ts
"use client"
import { useState, useEffect } from 'react'
import { getAllProducts } from '@/lib/services/shopServices'

export const useProducts = () => {
  const [product, setproduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts()
      setproduct(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { product, loading, error, refetch: fetchProducts }
}