'use client'

import React from 'react'
import Image from 'next/image'
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
  return (
    <div className={`${styles.contentCard} ${!image ? styles.noImage : ''}`} onClick={onReadMore}>
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={title}
            className={styles.cardImage}
            width={400}
            height={200}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
