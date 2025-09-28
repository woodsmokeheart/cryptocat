import React from 'react'
import type { Metadata } from 'next'
import BaseLayout from './layouts/BaseLayout'
import Hero from '@/components/Hero/Hero'
import VerticalLines from '@/components/VerticalLines/VerticalLines'
import BottomCredits from '@/components/BottomCredits/BottomCredits'

export const metadata: Metadata = {
  title: 'CryptoCat - Главная',
  description: 'Добро пожаловать на CryptoCat - ваш надежный спутник в мире криптовалют',
}

export default function HomePage() {
  return (
    <BaseLayout>
      <main>
        <Hero />
        <VerticalLines />
        <BottomCredits />
      </main>
    </BaseLayout>
  )
}