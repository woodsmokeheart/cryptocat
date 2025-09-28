import React from 'react'

interface ShopLayoutProps {
  children: React.ReactNode
}

const ShopLayout: React.FC<ShopLayoutProps> = ({ children }) => {
  return (
    <div className="shop-layout">
      {children}
    </div>
  )
}

export default ShopLayout
