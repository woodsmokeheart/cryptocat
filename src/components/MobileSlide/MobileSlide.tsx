'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import styles from './MobileSlide.module.css'
import { SlideContent } from '../../types/modal'

interface MobileSlideProps {
  slide: SlideContent
  index: number
  isOpen: boolean
  onToggle: () => void
}

const MobileSlide: React.FC<MobileSlideProps> = ({ slide, index, isOpen, onToggle }) => {
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [])

  const isCollapsed = !isOpen

  // Используем заголовок напрямую из слайда
  const slideTitle = slide.title || `Раздел ${index + 1}`

  return (
    <div className={`${styles.mobileSlide} ${isCollapsed ? styles.collapsed : ''}`}>
      <div 
        className={styles.slideHeader}
        onClick={onToggle}
      >
        <h3 className={styles.slideTitle}>{slideTitle}</h3>
        <button 
          className={styles.collapseButton}
          aria-label={isCollapsed ? 'Развернуть раздел' : 'Свернуть раздел'}
        >
          {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
        </button>
      </div>
      
      <div 
        className={`${styles.slideContent} ${isCollapsed ? styles.contentCollapsed : ''}`}
        style={{
          height: isCollapsed ? '0px' : contentHeight ? `${contentHeight}px` : 'auto',
          overflow: isCollapsed ? 'hidden' : 'visible'
        }}
      >
        <div ref={contentRef}>
          {slide.content}
        </div>
      </div>
    </div>
  )
}

export default MobileSlide
