'use client'

import React from 'react'
import styles from './ContentCard.module.css'

interface ContentCardProps {
  id: number
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
  return (
    <div className={`${styles.contentCard} ${!image ? styles.noImage : ''}`} onClick={onReadMore}>
      {image && (
        <div className={styles.imageContainer}>
          <img
            src={image}
            alt={title}
            className={styles.cardImage}
          />
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
