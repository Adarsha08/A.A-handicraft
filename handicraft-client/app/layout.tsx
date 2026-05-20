import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloating from '@/components/layout/WhatsAppFloting'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'

export const metadata: Metadata = {
  title: 'A.A. Handicraft',
  description: 'Authentic Nepali Handicrafts from Kathmandu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <WhatsAppFloating />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}