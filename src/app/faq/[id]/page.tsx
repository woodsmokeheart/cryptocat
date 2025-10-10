'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { faqData } from '@/data/faqData'
import FaqDetail from '@/components/FaqDetail/FaqDetail'

interface FaqDetailPageProps {
  params: {
    id: string
  }
}

const FaqDetailPage: React.FC<FaqDetailPageProps> = ({ params }) => {
  const router = useRouter()
  const faqSlug = params.id
  const faq = faqData.find(item => item.slug === faqSlug)

  const handleBack = () => {
    router.back()
  }

  if (!faq) {
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
        <h1>FAQ не найден</h1>
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
