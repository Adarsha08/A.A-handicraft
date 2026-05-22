import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { AdminAuthProvider } from '@/context/AdminAuthContext'

export const metadata: Metadata = {
  title: 'A.A. Handicraft',
  description: 'Authentic Nepali Handicrafts from Kathmandu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AdminAuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AdminAuthProvider>
      </body>
    </html>
  )
}