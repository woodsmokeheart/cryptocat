'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaqItem } from '@/types/faq'
import styles from './FaqList.module.css'

const FaqList: React.FC = () => {
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
      const response = await fetch('/api/faq?include_inactive=true')
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

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот FAQ?')) {
      return
    }

    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete FAQ')
      }

      setFaqs(faqs.filter(faq => faq.id !== id))
    } catch (err) {
      console.error('Error deleting FAQ:', err)
      alert('Ошибка при удалении FAQ')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_active: !currentStatus
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update FAQ status')
      }

      const updatedFaq = await response.json()
      setFaqs(faqs.map(faq => faq.id === id ? updatedFaq : faq))
    } catch (err) {
      console.error('Error updating FAQ status:', err)
      alert('Ошибка при обновлении статуса FAQ')
    }
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
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка FAQ...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/admin')}
          >
            <FaArrowLeft />
            Назад
          </button>
          <h1 className={styles.title}>Управление FAQ</h1>
          <button 
            className={styles.createButton}
            onClick={() => router.push('/admin/faq/new')}
          >
            <FaPlus />
            Создать FAQ
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {faqs.length === 0 ? (
          <div className={styles.empty}>
            <p>FAQ не найдены</p>
          </div>
        ) : (
          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <div key={faq.id} className={styles.faqCard}>
                {faq.image_url && (
                  <div className={styles.imageContainer}>
                    <img 
                      src={faq.image_url} 
                      alt={faq.title}
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{faq.title}</h3>
                    <div className={styles.cardMeta}>
                      <span className={styles.slug}>/{faq.slug}</span>
                      <span className={`${styles.status} ${faq.is_active ? styles.active : styles.inactive}`}>
                        {faq.is_active ? 'Активен' : 'Неактивен'}
                      </span>
                    </div>
                  </div>
                  <p className={styles.description}>{faq.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.date}>
                      {formatDate(faq.created_at)}
                    </span>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => toggleActive(faq.id, faq.is_active)}
                        title={faq.is_active ? 'Деактивировать' : 'Активировать'}
                      >
                        {faq.is_active ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => router.push(`/admin/faq/${faq.id}/edit`)}
                        title="Редактировать"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(faq.id)}
                        title="Удалить"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FaqList
