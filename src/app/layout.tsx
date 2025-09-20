import type { Metadata } from 'next'
import { Raleway, Oswald } from 'next/font/google'
import Header from '@/components/Header/Header'
import SocialIcons from '@/components/SocialIcons/SocialIcons'
import Preloader from '@/components/Preloader/Preloader'
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Preloader />
        <div id="containerOT">
          <Header />
          <SocialIcons />
          {children}
        </div>
      </body>
    </html>
  )
}