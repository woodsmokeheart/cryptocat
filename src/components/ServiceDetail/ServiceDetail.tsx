'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Service } from '@/types/service'
import styles from './ServiceDetail.module.css'

interface ServiceDetailProps {
  service: Service
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  const router = useRouter()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleBack = () => {
    router.back()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Назад
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          {imageLoading && !imageError && (
            <div className={styles.imageSkeleton}>
              <div className={styles.skeletonShimmer} />
            </div>
          )}
          {!imageError && (
            <img
              src={service.image_url}
              alt={service.title}
              className={`${styles.image} ${imageLoading ? styles.imageLoading : styles.imageLoaded}`}
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

        <div className={styles.textContent}>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.description}>{service.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail

