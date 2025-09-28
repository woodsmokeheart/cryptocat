import React from 'react'
import Header from '@/components/Header/Header'
import SocialIcons from '@/components/SocialIcons/SocialIcons'
import ModalManager from '@/components/ModalManager/ModalManager'

interface BaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <SocialIcons />
      {children}
      <ModalManager />
    </>
  )
}

export default BaseLayout
