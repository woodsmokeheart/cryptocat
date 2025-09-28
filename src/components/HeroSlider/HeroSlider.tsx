'use client'

import React, { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './HeroSlider.module.css'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  accent: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "ДИЗАЙН - ЭТО",
    subtitle: "ПРОЦЕСС",
    description: "Мы создаем инновационные решения в области блокчейн технологий",
    accent: "для будущего."
  },
  {
    id: 2,
    title: "ТВОРЧЕСТВО - ЭТО",
    subtitle: "МЫШЛЕНИЕ", 
    description: "Создаем цифровые решения, которые открывают новые возможности",
    accent: "в мире крипто."
  },
  {
    id: 3,
    title: "КОД - ЭТО",
    subtitle: "ПОЭЗИЯ",
    description: "Разрабатываем элегантные решения с чистым, поддерживаемым кодом",
    accent: "который говорит сам за себя."
  }
]

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className={styles.heroSlider}>
      {/* Dot pattern background */}
      <div className={styles.dotPatternWrapperHome}>
        <div className={styles.dotPatternHome}></div>
      </div>

      {/* Main content */}
      <div className={styles.slideContent}>
        {/* Left section with text */}
        <div className={styles.leftSection}>
          <div className={styles.slideText}>
            <div className={styles.slideLabel}>БРЕНД</div>
            <h1 className={styles.slideTitle}>
              {slides[currentSlide].title}
              <br />
              <span className={styles.slideAccent}>{slides[currentSlide].subtitle}</span>
            </h1>
            <p className={styles.slideDescription}>
              {slides[currentSlide].description}{' '}
              <span className={styles.descriptionAccent}>{slides[currentSlide].accent}</span>
            </p>
          </div>
        </div>

        {/* Right section with image */}
        <div className={styles.rightSection}>
          <div className={styles.slideImage}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.imageDimensions}>1920 X 1280 PX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className={styles.sliderControls}>
        <button 
          className={styles.controlButton}
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button 
          className={styles.controlButton}
          onClick={goToPrevious}
          aria-label="Предыдущий слайд"
        >
          <FaChevronLeft />
        </button>
        <button 
          className={styles.controlButton}
          onClick={goToNext}
          aria-label="Следующий слайд"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Slide indicators */}
      <div className={styles.slideIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      {/* Contact info */}
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>(+1) 234 56 789</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactAccent}>CRYPTOCATAGENCY@GMAIL.COM</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider