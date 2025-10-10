'use client'

import React from 'react'
import Image from 'next/image'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { FaqItem } from '../../data/faqData'
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
          <FaArrowLeft /> Назад к FAQ
        </button>
        <span className={styles.date}>{faq.date}</span>
      </div>
      
      <div className={styles.imageContainer}>
        <Image
          src={faq.image}
          alt={faq.title}
          width={800}
          height={400}
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{faq.title}</h2>
        <p className={styles.description}>{faq.description}</p>
        
        <div className={styles.fullContent}>
          {faq.content}
        </div>
      </div>
    </div>
  )
}

export default FaqDetail

