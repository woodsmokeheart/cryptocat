'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Service } from '@/types/service'
import styles from './ServiceDetail.module.css'

interface ServiceDetailProps {
  service: Service
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  const router = useRouter()

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
          <Image
            src={service.image_url}
            alt={service.title}
            fill
            className={styles.image}
            sizes="100vw"
            priority
          />
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

