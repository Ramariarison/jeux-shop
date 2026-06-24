import type { Metadata } from 'next'
import { Inter, Rajdhani } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/authContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

export const metadata: Metadata = {
  title: 'Rabbit Shop - Recharge tes jetons',
  description: 'Achetez vos diamonds, UC et jetons de jeux mobiles facilement à Madagascar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${rajdhani.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}