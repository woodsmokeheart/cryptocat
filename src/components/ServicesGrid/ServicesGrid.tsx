'use client'

import React, { useState, useEffect } from 'react'
import { Service } from '@/types/service'
import ServiceCard from '../ServiceCard/ServiceCard'
import ServicesMobileAccordion from '../ServicesMobileAccordion/ServicesMobileAccordion'
import Loader from '../Loader/Loader'
import styles from './ServicesGrid.module.css'

const ServicesGrid: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/services')
      if (!response.ok) {
        throw new Error('Failed to fetch services')
      }
      const data = await response.json()
      setServices(data)
    } catch (err) {
      console.error('Error fetching services:', err)
      setError('Ошибка загрузки услуг')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader size="medium" />
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

  if (services.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>Услуги пока не добавлены</div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.grid}>
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      <div className={styles.mobileAccordion}>
        <ServicesMobileAccordion services={services} />
      </div>
    </>
  )
}

export default ServicesGrid

