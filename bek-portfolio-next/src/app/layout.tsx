import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bilguunzaya Mijiddorj - Portfolio',
  description: 'Research Engineer, Hardware-Software Architect, AI/ML Innovator, and Startup Co-Founder',
  keywords: ['portfolio', 'engineering', 'research', 'AI/ML', 'startup', 'hardware', 'software'],
  authors: [{ name: 'Bilguunzaya Mijiddorj' }],
  openGraph: {
    title: 'Bilguunzaya Mijiddorj - Portfolio',
    description: 'Research Engineer, Hardware-Software Architect, AI/ML Innovator, and Startup Co-Founder',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
