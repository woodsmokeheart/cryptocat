'use client'

import React, { useEffect, useState } from 'react'
import { FaTimes, FaQuestionCircle } from 'react-icons/fa'
import Portal from '@/components/Portal/Portal'
import FaqGrid from '@/components/FaqGrid/FaqGrid'
import styles from './FaqModal.module.css'

interface FaqModalProps {
  isOpen: boolean
  onClose: () => void
}

const FADE_DURATION = 250

const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose }) => {
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
              <h2 className={styles.title}>FAQ</h2>
              <p className={styles.subtitle}>
                Ответы на часто задаваемые вопросы о работе с Crypto Cat и торговле на криптовалютных биржах.
              </p>
            </div>

            <div className={`${styles.content} ${styles.faqLayout}`}>
              <div className={styles.descriptionBlock}>
                <div className={styles.descriptionGlow} />
                <div className={styles.descriptionHeader}>
                  <FaQuestionCircle className={styles.sparkIcon} />
                  <span>Часто задаваемые вопросы</span>
                </div>

                <div className={styles.descriptionContent}>
                  <p>
                    Здесь собраны ответы на самые популярные вопросы о наших услугах, работе с блокчейн технологиями
                    и торговле криптовалютами.
                  </p>
                  <p>
                    Если вы не нашли ответ на свой вопрос, свяжитесь с нами через официальные каналы коммуникации.
                  </p>
                </div>
              </div>

              <div className={styles.teamBlock}>
                <div className={styles.teamHeader}>
                  <h3>Вопросы и ответы</h3>
                  <p>
                    Выберите интересующий вас вопрос, чтобы узнать больше о наших услугах и решениях.
                  </p>
                </div>

                <div className={styles.faqGrid}>
                  <FaqGrid />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default FaqModal

