'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './ModalSlider.module.css'
import { SlideContent } from '../../types/modal'

interface ModalSliderProps {
  slides: SlideContent[]
  currentSlide?: number
  onSlideChange?: (index: number) => void
  className?: string
}

const ModalSlider: React.FC<ModalSliderProps> = ({ 
  slides, 
  currentSlide = 0, 
  onSlideChange,
  className 
}) => {
  const [activeSlide, setActiveSlide] = useState(currentSlide)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveSlide(currentSlide)
  }, [currentSlide])

  const handleSlideChange = (index: number) => {
    setActiveSlide(index)
    onSlideChange?.(index)
  }

  const goToNext = () => {
    const nextSlide = activeSlide === slides.length - 1 ? 0 : activeSlide + 1
    handleSlideChange(nextSlide)
  }

  const goToPrevious = () => {
    const prevSlide = activeSlide === 0 ? slides.length - 1 : activeSlide - 1
    handleSlideChange(prevSlide)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  if (!slides || slides.length === 0) {
    return null
  }


  return (
    <div 
      className={`${styles.sliderContainer} ${className || ''}`}
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.sliderWrapper}>
        <div 
          className={styles.slidesContainer}
          style={{ 
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={styles.slide}
              style={{ width: '100%' }}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation indicators */}
      {slides.length > 1 && (
        <div className={styles.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === activeSlide ? styles.active : ''
              }`}
              onClick={() => handleSlideChange(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ModalSlider
