import type { Metadata } from 'next'
import { Raleway, Oswald } from 'next/font/google'
import Header from '@/components/Header/Header'
import SocialIcons from '@/components/SocialIcons/SocialIcons'
import Preloader from '@/components/Preloader/Preloader'
import ModalManager from '@/components/ModalManager/ModalManager'
import './globals.css'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-oswald',
})

export const metadata: Metadata = {
  title: 'CryptoCat - Главная',
  description: 'Добро пожаловать на CryptoCat - ваш надежный спутник в мире криптовалют',
  keywords: 'криптовалюта, биткоин, ethereum, торговля, блокчейн',
  authors: [{ name: 'CryptoCat Team' }],
  creator: 'CryptoCat',
  publisher: 'CryptoCat',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://cryptocat.com',
    title: 'CryptoCat - Главная',
    description: 'Добро пожаловать на CryptoCat - ваш надежный спутник в мире криптовалют',
    siteName: 'CryptoCat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoCat - Главная',
    description: 'Добро пожаловать на CryptoCat - ваш надежный спутник в мире криптовалют',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${raleway.variable} ${oswald.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" href="/android-chrome-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/android-chrome-512x512.png" sizes="512x512" type="image/png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#FF7A3D" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
      </head>
      <body>
        <Preloader />
        <div id="containerOT">
          <Header />
          <SocialIcons />
          {children}
          <ModalManager />
        </div>
      </body>
    </html>
  )
}