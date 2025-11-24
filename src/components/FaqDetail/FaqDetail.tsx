'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { FaqItem } from '@/types/faq'
import styles from './FaqDetail.module.css'

interface FaqDetailProps {
  faq: FaqItem
  onBack?: () => void
}

const FaqDetail: React.FC<FaqDetailProps> = ({ faq, onBack }) => {
  const router = useRouter()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className={styles.container} data-faq-detail>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button className={styles.backLink} onClick={handleBack}>
            <FaArrowLeft />
            <span className={styles.backText}>Назад</span>
          </button>
          <Link href="/" className={styles.logoLink}>
            <Image 
              className={styles.logoImg} 
              alt="CryptoCat Logo" 
              src="/img/textLogo.png"
              width={40}
              height={40}
              sizes="100vw"
              priority
            />
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.article}>
          <h1 className={styles.title}>{faq.title}</h1>

          {faq.image_url && (
            <div className={styles.coverImage}>
              {imageLoading && !imageError && (
                <div className={styles.imageSkeleton}>
                  <div className={styles.skeletonShimmer} />
                </div>
              )}
              {!imageError && (
                <img
                  src={faq.image_url}
                  alt={faq.title}
                  className={`${styles.coverImageEl} ${imageLoading ? styles.imageLoading : styles.imageLoaded}`}
                  loading="lazy"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false)
                    setImageError(true)
                  }}
                />
              )}
              {imageError && (
                <div className={styles.imageError}>
                  <span>Изображение не загружено</span>
                </div>
              )}
            </div>
          )}

          <div className={styles.meta}>
            <span className={styles.publishedIcon} title="Опубликован">
              <FaCheck />
            </span>
            <time className={styles.date}>
              {new Date(faq.created_at).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </div>

          {faq.description && (
            <div className={styles.excerpt}>
              <p>{faq.description}</p>
            </div>
          )}

          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: faq.content }}
          />

          <div className={styles.articleFooter}>
            <p className={styles.updatedAt}>
              Последнее обновление:{' '}
              {new Date(faq.updated_at || faq.created_at).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}

export default FaqDetail

