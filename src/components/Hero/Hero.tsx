'use client'

import React, { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Hero.module.css'

interface Slide {
  id: number
  heading: string
  title: string
  titleAccent: string
  description: string
  descriptionAccent: string
  bgImage: string
}

const slides: Slide[] = [
  {
    id: 1,
    heading: "Компания",
    title: "Простота это",
    titleAccent: "сложность",
    description: "Мы предоставляем актуальные решения для каждого дня, независимо от",
    descriptionAccent: "стадии рынка.",
    bgImage: styles.bgImg1
  },
  {
    id: 2,
    heading: "Сообщество",
    title: "Трейдинг - это",
    titleAccent: "процесс",
    description: "Самое активное и успешное сообщество, состоящее из более чем 10 000 трейдеров",
    descriptionAccent: "со всего мира.",
    bgImage: styles.bgImg2
  },
  {
    id: 3,
    heading: "Команда",
    title: "Спокойствие - это",
    titleAccent: "решение",
    description: "Команда достойна называться",
    descriptionAccent: "лучшей в своей области.",
    bgImage: styles.bgImg3
  },
  {
    id: 4,
    heading: "Будущее",
    title: "Достижения, которые",
    titleAccent: "впечатляют",
    description: "Уникальность подходов в сочетании с наставничеством и современными технологиями",
    descriptionAccent: "могут вас удивить.",
    bgImage: styles.bgImg4
  }
]

const getSlideTransform = (index: number, currentSlide: number, previousSlide: number, direction: 'next' | 'prev'): string => {
  if (index === currentSlide) {
    return 'translateX(0%)'
  } else if (index === previousSlide) {
    // Предыдущий слайд уходит в направлении, противоположном движению
    return direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)'
  } else {
    // Остальные слайды в направлении движения
    return direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)'
  }
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [previousSlide, setPreviousSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next')

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setAnimationDirection('next')
      setCurrentSlide((prev) => {
        setPreviousSlide(prev)
        return (prev + 1) % slides.length
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const goToPrevious = () => {
    setAnimationDirection('prev')
    setPreviousSlide(currentSlide)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setAnimationDirection('next')
    setPreviousSlide(currentSlide)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    setAnimationDirection('next')
    setPreviousSlide(currentSlide)
    setCurrentSlide(index)
  }

  return (
    <div className={styles.heroFullscreen}>
      <div className={styles.heroFullscreenFix}>
        <div className={styles.heroBg}>
          {/* Hero slider wrapper */}
          <div className={styles.heroSliderWrapper}>
            <div className={styles.heroSlider}>
              {/* Dot pattern */}
              <div className={styles.dotPatternWrapperHome}>
                <div className={styles.dotPatternHome}></div>
              </div>

              {/* Slide content */}
              {slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={styles.swiperSlideTxt}
                  style={{ 
                    transform: `${getSlideTransform(index, currentSlide, previousSlide, animationDirection)} translateY(-50%)`,
                    opacity: index === currentSlide ? 1 : 0
                  }}
                >
                  <div className={styles.swiperSlideTxtInner}>
                    {/* Page subtitle */}
                    <h4 className={styles.postHeading}>
                      {slide.heading}
                    </h4>
                    
                    {/* Divider */}
                    <div className={styles.innerDividerHalf}></div>
                    
                    {/* Page title */}
                    <div className={styles.postTitle}>
                      {slide.title}<br />
                      <span className={styles.postTitleColor}>{slide.titleAccent}</span>
                    </div>
                    
                    {/* Divider */}
                    <div className={styles.innerDivider}></div>
                    
                    {/* Page text */}
                    <div className={styles.postTxt}>
                      <p>
                        {slide.description}{' '}
                        <a className={styles.linkUnderline} href="#">
                          {slide.descriptionAccent}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero slider wrapper IMG */}
          <div className={styles.heroSliderWrapperImg}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`${styles.heroSliderBg} ${slide.bgImage}`}
                style={{ 
                  transform: getSlideTransform(index, currentSlide, previousSlide, animationDirection),
                  opacity: index === currentSlide ? 1 : 0
                }}
              >
                <div className={`${styles.overlay} ${styles.overlayDark}`}></div>
                <div className={styles.coverAll}></div>
              </div>
            ))}
          </div>

          {/* Swiper slider controls */}
          <div className={styles.heroSliderBgControls}>
            <button 
              className={`${styles.swiperSlideControls} ${styles.slidePrev}`}
              onClick={goToPrevious}
              aria-label="Предыдущий слайд"
            >
              <FaChevronLeft />
            </button>
            <button 
              className={`${styles.swiperSlideControls} ${styles.slideNext}`}
              onClick={goToNext}
              aria-label="Следующий слайд"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Swiper slider play-pause */}
          <button 
            className={styles.swiperSlideControlsPlayPause}
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Swiper slider pagination */}
          <div className={styles.swiperSlidePagination}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.swiperPaginationBullet} ${index === currentSlide ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
