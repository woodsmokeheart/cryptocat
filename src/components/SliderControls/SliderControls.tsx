'use client'

import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './SliderControls.module.css'

interface SliderControlsProps {
  onPrevious: () => void
  onNext: () => void
  currentSlide: number
  totalSlides: number
  className?: string
}

const SliderControls: React.FC<SliderControlsProps> = ({
  onPrevious,
  onNext,
  currentSlide,
  totalSlides,
  className
}) => {
  if (totalSlides <= 1) {
    return null
  }

  return (
    <div className={`${styles.controlsContainer} ${className || ''}`}>
      <button
        className={styles.controlButton}
        onClick={onPrevious}
        aria-label="Previous slide"
        type="button"
      >
        <FaChevronLeft />
      </button>
      
      <div className={styles.slideCounter}>
        <span className={styles.currentSlide}>{currentSlide + 1}</span>
        <span className={styles.slideSeparator}>/</span>
        <span className={styles.totalSlides}>{totalSlides}</span>
      </div>
      
      <button
        className={styles.controlButton}
        onClick={onNext}
        aria-label="Next slide"
        type="button"
      >
        <FaChevronRight />
      </button>
    </div>
  )
}

export default SliderControls
