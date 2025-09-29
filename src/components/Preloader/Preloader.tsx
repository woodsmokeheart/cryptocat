'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Preloader.module.css'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Анимация прогресса
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Скрываем прелоадер после загрузки страницы
    const handleLoad = () => {
      setTimeout(() => {
        setProgress(100)
        setTimeout(() => {
          setIsVisible(false)
        }, 500)
      }, 1500) // Увеличиваем время для демонстрации
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div className={styles.preloaderBg}></div>
      <div id="preloader" className={styles.preloader}>
        <div className={styles.preloaderContainer}>
          {/* Фоновые геометрические элементы */}
          <div className={styles.geometricBg}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
            <div className={styles.triangle}></div>
            <div className={styles.square}></div>
          </div>

          {/* Основной контент */}
          <div className={styles.mainContent}>
            {/* Логотип CC */}
            <div className={styles.logoContainer}>
              <div className={styles.logoCC}>
                <Image 
                  src="/img/logo.png" 
                  alt="CRYPTOCAT Logo" 
                  width={100}
                  height={100}
                  className={styles.logoImage}
                  priority
                />
              </div>
            </div>

            {/* Название проекта */}
            <div className={styles.projectName}>
              <span className={styles.crypto}>CRYPTO</span><span className={styles.cat}>CAT</span>
            </div>

            {/* Подзаголовок */}
            <div className={styles.subtitle}>
              УМНЫЙ ТРЕЙДИНГ
            </div>

            {/* Прогресс бар */}
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <div className={styles.progressText}>
                {Math.round(Math.min(progress, 100))}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preloader
