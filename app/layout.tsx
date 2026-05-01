import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/nav/Nav'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.factoryfix.com'),
  title: {
    default: 'FactoryFix Blog | Insights for Manufacturing & Skilled Trades',
    template: '%s | FactoryFix Blog',
  },
  description:
    'Knowledge and resources you need to succeed in manufacturing recruitment.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.factoryfix.com/blog',
    siteName: 'FactoryFix',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@factoryfix',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
