'use client'

import React, { useState, useEffect } from 'react'
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
    title: "DESIGN IS A",
    subtitle: "PROCESS",
    description: "Lorem Ipsum has been the industry's standard dummy text ever",
    accent: "since the 1500s."
  },
  {
    id: 2,
    title: "CREATIVE IS",
    subtitle: "THINKING", 
    description: "Creating digital experiences that push boundaries and inspire",
    accent: "the future of web."
  },
  {
    id: 3,
    title: "CODE IS",
    subtitle: "POETRY",
    description: "Crafting elegant solutions with clean, maintainable code",
    accent: "that speaks volumes."
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
            <div className={styles.slideLabel}>THE BRAND</div>
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
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button 
          className={styles.controlButton}
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ←
        </button>
        <button 
          className={styles.controlButton}
          onClick={goToNext}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Slide indicators */}
      <div className={styles.slideIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Contact info */}
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <span className={styles.contactLabel}>(+1) 234 56 789</span>
        </div>
        <div className={styles.contactItem}>
          <span className={styles.contactAccent}>CRYPTOCAT@CRYPTOCAT.COM</span>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider