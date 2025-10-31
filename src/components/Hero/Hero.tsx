'use client'

import React, { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Slide } from '@/types/slide'
import Loader from '../Loader/Loader'
import styles from './Hero.module.css'

// Fallback слайды на случай, если база данных недоступна
const fallbackSlides: Slide[] = [
  {
    id: '1',
    heading: "Компания",
    title: "Простота это",
    title_accent: "сложность",
    description: "Мы предоставляем актуальные решения для каждого дня, независимо от",
    description_accent: "стадии рынка.",
    background_image: '/img/background/hero-bg-1.jpg',
    link_url: '',
    link_text: '',
    order_index: 0,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author_id: ''
  },
  {
    id: '2',
    heading: "Сообщество",
    title: "Трейдинг - это",
    title_accent: "процесс",
    description: "Самое активное и успешное сообщество, состоящее из более чем 10 000 трейдеров",
    description_accent: "со всего мира.",
    background_image: '/img/background/hero-bg-2.jpg',
    link_url: '',
    link_text: '',
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author_id: ''
  },
  {
    id: '3',
    heading: "Команда",
    title: "Спокойствие - это",
    title_accent: "решение",
    description: "Команда достойна называться",
    description_accent: "лучшей в своей области.",
    background_image: '/img/background/hero-bg-3.jpg',
    link_url: '',
    link_text: '',
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author_id: ''
  },
  {
    id: '4',
    heading: "Будущее",
    title: "Достижения, которые",
    title_accent: "впечатляют",
    description: "Уникальность подходов в сочетании с наставничеством и современными технологиями",
    description_accent: "могут вас удивить.",
    background_image: '/img/background/hero-bg-4.jpg',
    link_url: '',
    link_text: '',
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    author_id: ''
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
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [previousSlide, setPreviousSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next')
  const [loading, setLoading] = useState(true)

  // Загружаем слайды из базы данных
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/slides')
        const data = await response.json()
        
        if (response.ok && data.slides && data.slides.length > 0) {
          setSlides(data.slides)
        }
      } catch (error) {
        console.error('Failed to fetch slides:', error)
        // Используем fallback слайды
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return

    const interval = setInterval(() => {
      setAnimationDirection('next')
      setCurrentSlide((prev) => {
        setPreviousSlide(prev)
        return (prev + 1) % slides.length
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const goToPrevious = () => {
    if (slides.length === 0) return
    setAnimationDirection('prev')
    setPreviousSlide(currentSlide)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    if (slides.length === 0) return
    setAnimationDirection('next')
    setPreviousSlide(currentSlide)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    if (slides.length === 0) return
    setAnimationDirection('next')
    setPreviousSlide(currentSlide)
    setCurrentSlide(index)
  }

  if (loading) {
    return (
      <div className={styles.heroFullscreen}>
        <div className={styles.heroFullscreenFix}>
          <div className={styles.heroBg}>
            <div className={styles.loadingContainer}>
              <Loader size="large" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className={styles.heroFullscreen}>
        <div className={styles.heroFullscreenFix}>
          <div className={styles.heroBg}>
            <div className={styles.noSlidesContainer}>
              <h2>Слайды не найдены</h2>
              <p>Обратитесь к администратору для настройки слайдов</p>
            </div>
          </div>
        </div>
      </div>
    )
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
                      <span className={styles.postTitleColor}>{slide.title_accent}</span>
                    </div>
                    
                    {/* Divider */}
                    <div className={styles.innerDivider}></div>
                    
                    {/* Page text */}
                    <div className={styles.postTxt}>
                      <p>
                        {slide.description}{' '}
                        {slide.link_url ? (
                          <a className={styles.linkUnderline} href={slide.link_url} target="_blank" rel="noopener noreferrer">
                            {slide.description_accent}
                          </a>
                        ) : (
                          <span className={styles.linkUnderline}>{slide.description_accent}</span>
                        )}
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
                className={styles.heroSliderBg}
                style={{ 
                  backgroundImage: `url(${slide.background_image})`,
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
