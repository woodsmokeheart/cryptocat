'use client'

import React, { useEffect, useState, ReactNode, useCallback } from 'react'
import { FaTimes } from 'react-icons/fa'
import Portal from '../Portal/Portal'
import ModalSlider from '../ModalSlider/ModalSlider'
import { SlideContent } from '../../types/modal'
import SliderControls from '../SliderControls/SliderControls'
import MobileSlide from '../MobileSlide/MobileSlide'
import { useTypewriter } from '../../hooks/useTypewriter'
import styles from './ModalLayout.module.css'

interface ModalLayoutProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  slides: SlideContent[]
  children?: ReactNode
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isOpen,
  onClose,
  title,
  description,
  slides,
  children
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openSlideIndex, setOpenSlideIndex] = useState<number | null>(null)
  const { displayedText: displayedTitle } = useTypewriter({ 
    text: isOpen ? title : '', 
    speed: 80, 
    delay: 300 
  })

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    const calculateBrowserUIHeight = () => {
      if (window.innerWidth <= 768) {
        // Вычисляем высоту браузерной панели
        const viewportHeight = window.innerHeight
        const documentHeight = document.documentElement.clientHeight
        const browserUIHeight = Math.max(0, viewportHeight - documentHeight)
        
        // Устанавливаем CSS переменную
        document.documentElement.style.setProperty('--browser-ui-height', `${browserUIHeight}px`)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      
      // Вычисляем высоту браузерной панели
      calculateBrowserUIHeight()
      
      // Пересчитываем при изменении размера окна
      window.addEventListener('resize', calculateBrowserUIHeight)
      window.addEventListener('orientationchange', calculateBrowserUIHeight)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
      window.removeEventListener('resize', calculateBrowserUIHeight)
      window.removeEventListener('orientationchange', calculateBrowserUIHeight)
    }
  }, [isOpen, onClose, goToPrevious, goToNext])

  if (!isOpen) return null

  return (
    <Portal>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div 
          className={styles.modalContent} 
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>
              {displayedTitle}
            </h2>
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть модальное окно"
            >
              <FaTimes />
            </button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.leftPanel}>
              <div className={styles.contentSection}>
                {description && (
                  <p className={styles.modalDescription}>{description}</p>
                )}
                {children}
              </div>
              
              {/* Desktop controls */}
              <div className={styles.desktopControls}>
                {slides.length > 1 && (
                  <div className={styles.controlsSection}>
                    <SliderControls
                      onPrevious={goToPrevious}
                      onNext={goToNext}
                      currentSlide={currentSlide}
                      totalSlides={slides.length}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.rightPanel}>
              {/* Desktop slider */}
              <div className={styles.desktopSlider}>
                <ModalSlider 
                  slides={slides}
                  currentSlide={currentSlide}
                  onSlideChange={handleSlideChange}
                  className={styles.slider}
                />
              </div>
              
              {/* Mobile content list */}
              <div className={styles.mobileContent}>
                {slides.map((slide, index) => (
                  <MobileSlide 
                    key={slide.id} 
                    slide={slide}
                    index={index}
                    isOpen={openSlideIndex === index}
                    onToggle={() => setOpenSlideIndex(openSlideIndex === index ? null : index)}
                    isAlwaysOpen={slide.id === 'faq1' || slide.id === 'contact-info'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default ModalLayout
