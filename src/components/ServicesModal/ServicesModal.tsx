'use client'

import React, { useEffect, useState } from 'react'
import { FaTimes, FaBriefcase } from 'react-icons/fa'
import Portal from '@/components/Portal/Portal'
import ServicesGrid from '@/components/ServicesGrid/ServicesGrid'
import styles from './ServicesModal.module.css'

interface ServicesModalProps {
  isOpen: boolean
  onClose: () => void
}

const FADE_DURATION = 250

const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
      timeoutId = setTimeout(() => {
        setShouldRender(false)
      }, FADE_DURATION)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!shouldRender) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [shouldRender, onClose])

  if (!shouldRender) {
    return null
  }

  const overlayClassName = `${styles.overlay} ${isVisible ? styles.overlayVisible : ''}`.trim()
  const modalClassName = `${styles.modal} ${isVisible ? styles.modalVisible : ''}`.trim()

  return (
    <Portal>
      <div className={overlayClassName} onClick={onClose}>
        <div className={modalClassName} onClick={(event) => event.stopPropagation()}>
          <div className={styles.backgroundGlow} />
          <div className={styles.noiseLayer} />

          <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть модальное окно">
            <FaTimes />
          </button>

          <div className={styles.scrollArea}>
            <div className={styles.header}>
              <div className={styles.topSpacer} aria-hidden="true" />
              <h2 className={styles.title}>Наши услуги</h2>
              <p className={styles.subtitle}>
                Изучите наш полный спектр услуг по разработке блокчейн решений, веб-разработке и консультированию.
              </p>
            </div>

            <div className={`${styles.content} ${styles.servicesLayout}`}>
              <div className={styles.descriptionBlock}>
                <div className={styles.descriptionGlow} />
                <div className={styles.descriptionHeader}>
                  <FaBriefcase className={styles.sparkIcon} />
                  <span>Что мы предлагаем</span>
                </div>

                <div className={styles.descriptionContent}>
                  <p>
                    Мы специализируемся на создании инновационных решений в области блокчейн технологий,
                    веб-разработки и стратегического консультирования.
                  </p>
                  <p>
                    Каждая услуга адаптирована под ваши уникальные потребности и направлена на достижение
                    максимальной эффективности вашего бизнеса.
                  </p>
                </div>
              </div>

              <div className={styles.teamBlock}>
                <div className={styles.teamHeader}>
                  <h3>Спектр услуг</h3>
                  <p>
                    Выберите интересующую вас услугу, чтобы узнать больше о наших решениях и возможностях.
                  </p>
                </div>

                <div className={styles.servicesGrid}>
                  <ServicesGrid />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default ServicesModal

