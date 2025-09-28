'use client'

import React, { useEffect, useState, ReactNode, useCallback } from 'react'
import { FaTimes } from 'react-icons/fa'
import Portal from '../Portal/Portal'
import ModalSlider from '../ModalSlider/ModalSlider'
import { SlideContent } from '../../types/modal'
import SliderControls from '../SliderControls/SliderControls'
import MobileSlide from '../MobileSlide/MobileSlide'
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

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
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
            <h2 className={styles.modalTitle}>{title}</h2>
            <button 
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
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
