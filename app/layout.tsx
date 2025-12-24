import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'

export const metadata: Metadata = {
  title: 'Cartify',
  description: 'Reliable Cooking Gas. Safe, Fast, Affordable.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      </head>
      <body>
        <OrderProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </OrderProvider>
      </body>
    </html>
  )
}
