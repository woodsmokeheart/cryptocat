'use client'

import React, { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Скрываем прелоадер после загрузки страницы
    const handleLoad = () => {
      setTimeout(() => {
        setIsVisible(false)
      }, 1000) // Небольшая задержка для демонстрации
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div className={styles.preloaderBg}></div>
      <div id="preloader" className={styles.preloader}>
        <div id="preloader-status" className={styles.preloaderStatus}>
          <div className={styles.loader}></div>
        </div>
      </div>
    </>
  )
}

export default Preloader
