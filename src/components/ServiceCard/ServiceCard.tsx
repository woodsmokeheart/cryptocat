'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Service } from '@/types/service'
import styles from './ServiceCard.module.css'

interface ServiceCardProps {
  service: Service
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const router = useRouter()

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
        <Image
          src={service.image_url}
          alt={service.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
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

