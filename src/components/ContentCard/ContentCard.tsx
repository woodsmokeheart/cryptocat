'use client'

import React from 'react'
import Image from 'next/image'
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
    <div className={styles.contentCard}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        {/* Метаинформация */}
        <div className={styles.meta}>
          {date && <span className={styles.date}>{date}</span>}
          {author && <span className={styles.author}>{author}</span>}
        </div>
        
        {/* Кнопка "Читать" */}
        <button 
          className={styles.readButton}
          onClick={onReadMore}
        >
          Читать
        </button>
      </div>
    </div>
  )
}

export default ContentCard
