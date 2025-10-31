'use client'

import React from 'react'
import Image from 'next/image'
import styles from './Loader.module.css'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', className }) => {
  // Размеры изображения пропорциональны размеру круга (примерно 75% от размера круга)
  const imageSize = size === 'small' ? 45 : size === 'large' ? 90 : 60

  return (
    <div className={`${styles.loader} ${styles[size]} ${className || ''}`}>
      <div className={styles.loaderCircle}>
        <Image 
          src="/img/logo.png" 
          alt="Loading" 
          width={imageSize}
          height={imageSize}
          className={styles.loaderImage}
          priority
        />
      </div>
    </div>
  )
}

export default Loader

