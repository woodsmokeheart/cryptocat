'use client'

import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { FaqItem } from '@/types/faq'
import styles from './FaqDetail.module.css'

interface FaqDetailProps {
  faq: FaqItem
  onBack?: () => void
}

const FaqDetail: React.FC<FaqDetailProps> = ({ faq, onBack }) => {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className={styles.faqDetail} data-faq-detail>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <FaArrowLeft /> Назад
        </button>
        <span className={styles.date}>
          {new Date(faq.created_at).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>
      
      {faq.image_url && (
        <div className={styles.imageContainer}>
          <img
            src={faq.image_url}
            alt={faq.title}
            className={styles.image}
          />
        </div>
      )}
      
      <div className={styles.content}>
        <h2 className={styles.title}>{faq.title}</h2>
        <p className={styles.description}>{faq.description}</p>
        
        <div 
          className={styles.fullContent}
          dangerouslySetInnerHTML={{ __html: faq.content }}
        />
      </div>
    </div>
  )
}

export default FaqDetail

