'use client'

import React, { useState } from 'react'
import styles from './ContentCard.module.css'

interface ContentCardProps {
  id?: number | string
  image: string
  title: string
  description: string
  date?: string
  author?: string
  type?: 'news' | 'team'
  onReadMore?: () => void
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  id, 
  image, 
  title, 
  description, 
  date,
  author,
  type = 'news',
  onReadMore
}) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <div className={`${styles.contentCard} ${!image ? styles.noImage : ''}`} onClick={onReadMore}>
      {image && (
        <div className={styles.imageContainer}>
          {imageLoading && !imageError && (
            <div className={styles.imageSkeleton}>
              <div className={styles.skeletonShimmer} />
            </div>
          )}
          {!imageError && (
            <img
              src={image}
              alt={title}
              className={`${styles.cardImage} ${imageLoading ? styles.imageLoading : styles.imageLoaded}`}
              loading="lazy"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false)
                setImageError(true)
              }}
            />
          )}
          {imageError && (
            <div className={styles.imageError}>
              <span>Изображение не загружено</span>
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        {/* Метаинформация */}
        <div className={styles.meta}>
          {date && <span className={styles.date}>{date}</span>}
          {author && <span className={styles.author}>{author}</span>}
        </div>
      </div>
    </div>
  )
}

export default ContentCard
