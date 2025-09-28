import React from 'react'
import type { Metadata } from 'next'
import ShopPageClient from './ShopPageClient'

export const metadata: Metadata = {
  title: 'CryptoCat - Магазин',
  description: 'CryptoCat Store - эксклюзивный мерч и крипто аксессуары. Уникальная коллекция одежды и аксессуаров с брендингом CryptoCat.',
  keywords: 'криптовалюта, магазин, мерч, аксессуары, CryptoCat, блокчейн',
}

const ShopPage: React.FC = () => {
  return <ShopPageClient />
}

export default ShopPage

