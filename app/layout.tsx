import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Internet Banking',
  description: 'Welcome to TridishBank',
  generator: 'TridishBank',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">&#128176;</text></svg>',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
