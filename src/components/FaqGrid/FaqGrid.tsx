'use client'

import React, { useState } from 'react'
import ContentCard from '../ContentCard/ContentCard'
import FaqDetail from '../FaqDetail/FaqDetail'
import { faqData, FaqItem } from '../../data/faqData'
import styles from './FaqGrid.module.css'

const FaqGrid: React.FC = () => {
  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null)

  const handleReadMore = (faqId: number) => {
    const faq = faqData.find((item) => item.id === faqId)
    if (faq) {
      setSelectedFaq(faq)
    }
  }

  const handleBack = () => {
    setSelectedFaq(null)
  }

  // Если выбран FAQ, показываем детальный вид
  if (selectedFaq) {
    return <FaqDetail faq={selectedFaq} onBack={handleBack} />
  }

  // Иначе показываем сетку FAQ
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
            onReadMore={() => handleReadMore(faq.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default FaqGrid
