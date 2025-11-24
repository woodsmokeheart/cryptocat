'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Service } from '@/types/service'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
  service: Service
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const router = useRouter()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    if (service.detail_page_url) {
      // Если URL начинается с /, это внутренняя ссылка
      if (service.detail_page_url.startsWith('/')) {
        router.push(service.detail_page_url)
      } else {
        // Иначе открываем внешнюю ссылку
        window.open(service.detail_page_url, '_blank')
      }
    }
  }

  return (
    <div className={styles.serviceCard} onClick={handleClick}>
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
      <div className={styles.content}>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.description}>{service.description}</p>
        <button className={styles.button} onClick={(e) => { e.stopPropagation(); handleClick(); }}>
          Подробнее
        </button>
      </div>
    </div>
  )
}

export default ServiceCard

