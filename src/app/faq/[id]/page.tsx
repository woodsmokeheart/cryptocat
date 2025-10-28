'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaqItem } from '@/types/faq'
import FaqDetail from '@/components/FaqDetail/FaqDetail'

interface FaqDetailPageProps {
  params: {
    id: string
  }
}

const FaqDetailPage: React.FC<FaqDetailPageProps> = ({ params }) => {
  const router = useRouter()
  const faqSlug = params.id
  const [faq, setFaq] = useState<FaqItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFaq()
  }, [faqSlug])

  const fetchFaq = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/faq/slug/${faqSlug}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('FAQ не найден')
        } else {
          throw new Error('Failed to fetch FAQ')
        }
        return
      }

      const data = await response.json()
      setFaq(data)
    } catch (err) {
      console.error('Error fetching FAQ:', err)
      setError('Ошибка загрузки FAQ')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        color: '#fff', 
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Загрузка FAQ...</div>
      </div>
    )
  }

  if (error || !faq) {
    return (
      <div style={{ 
        padding: '20px', 
        color: '#fff', 
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1>{error || 'FAQ не найден'}</h1>
        <button 
          onClick={handleBack}
          style={{
            background: '#FF7A3D',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Oswald, sans-serif',
            textTransform: 'uppercase'
          }}
        >
          Назад
        </button>
      </div>
    )
  }

  return <FaqDetail faq={faq} onBack={handleBack} />
}

export default FaqDetailPage
