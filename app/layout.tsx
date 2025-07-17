import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Linguista',
  description: 'A community for language enthusiasts'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
