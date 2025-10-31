'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ContentCard from '../ContentCard/ContentCard'
import Loader from '../Loader/Loader'
import { FaqItem } from '@/types/faq'
import styles from './FaqGrid.module.css'

const FaqGrid: React.FC = () => {
  const router = useRouter()
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/faq')
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs')
      }
      const data = await response.json()
      setFaqs(data)
    } catch (err) {
      console.error('Error fetching FAQs:', err)
      setError('Ошибка загрузки FAQ')
    } finally {
      setLoading(false)
    }
  }

  const handleReadMore = (faqSlug: string) => {
    router.push(`/faq/${faqSlug}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className={`${styles.faqGridContainer} ${styles.loadingContainer}`}>
        <div className={styles.loading}>
          <Loader size="medium" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.faqGridContainer}>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  if (faqs.length === 0) {
    return (
      <div className={styles.faqGridContainer}>
        <div className={styles.empty}>FAQ пока нет</div>
      </div>
    )
  }

  return (
    <div className={styles.faqGridContainer}>
      <div className={styles.faqGrid}>
        {faqs.map((faq) => (
          <ContentCard
            key={faq.id}
            image={faq.image_url || ''}
            title={faq.title}
            description={faq.description}
            date={formatDate(faq.created_at)}
            type="news"
            onReadMore={() => handleReadMore(faq.slug)}
          />
        ))}
      </div>
    </div>
  )
}

export default FaqGrid
