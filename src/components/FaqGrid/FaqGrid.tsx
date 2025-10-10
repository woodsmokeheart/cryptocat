'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import ContentCard from '../ContentCard/ContentCard'
import { faqData } from '../../data/faqData'
import styles from './FaqGrid.module.css'

const FaqGrid: React.FC = () => {
  const router = useRouter()

  const handleReadMore = (faqSlug: string) => {
    router.push(`/faq/${faqSlug}`)
  }

  return (
    <div className={styles.faqGridContainer}>
      <div className={styles.faqGrid}>
        {faqData.map((faq) => (
          <ContentCard
            key={faq.id}
            id={faq.id}
            image={faq.image}
            title={faq.title}
            description={faq.description}
            date={faq.date}
            type="news"
            onReadMore={() => handleReadMore(faq.slug)}
          />
        ))}
      </div>
    </div>
  )
}

export default FaqGrid
