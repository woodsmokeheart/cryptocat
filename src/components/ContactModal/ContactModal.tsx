'use client'

import React, { useEffect, useState } from 'react'
import { FaTimes, FaTelegramPlane } from 'react-icons/fa'
import Portal from '@/components/Portal/Portal'
import ContactContent from '@/components/ContactContent/ContactContent'
import styles from './ContactModal.module.css'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const FADE_DURATION = 250

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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
              <h2 className={styles.title}>Связаться с нами</h2>
              <p className={styles.subtitle}>
                Официальные и проверенные каналы коммуникации команды CryptoCat. Напишите нам, если хотите
                обсудить проект, партнёрство или задать вопросы по продуктам.
              </p>
            </div>

            <div className={`${styles.content} ${styles.contactLayout}`}>
              <div className={styles.descriptionBlock}>
                <div className={styles.descriptionGlow} />
                <div className={styles.descriptionHeader}>
                  <FaTelegramPlane className={styles.sparkIcon} />
                  <span>Официальные контакты</span>
                </div>

                <div className={styles.descriptionContent}>
                  <p>
                    Мы отвечаем только через указанные ниже аккаунты и почту. Если вы получили сообщение от лица,
                    выдающего себя за CryptoCat, но канал отсутствует в списке, с большой вероятностью это мошенники.
                  </p>
                  <p>
                    При обращении через Telegram обязательно проверяйте никнейм и репутацию. Вся активная переписка
                    ведётся на русском или английском языках.
                  </p>
                </div>
              </div>

              <div className={styles.teamBlock}>
                <div className={styles.teamHeader}>
                  <h3>Каналы связи</h3>
                  <p>
                    Выберите удобный способ общения — от Telegram и TradingView до YouTube и email. Мы стараемся
                    отвечать оперативно во всех каналах.
                  </p>
                </div>

                <div className={styles.contactGrid}>
                  <ContactContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default ContactModal


