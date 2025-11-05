'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'
import { Service } from '@/types/service'
import styles from './ServicesList.module.css'

const ServicesList: React.FC = () => {
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/services?include_inactive=true')
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

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту услугу?')) {
      return
    }

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete service')
      }

      setServices(services.filter(service => service.id !== id))
    } catch (err) {
      console.error('Error deleting service:', err)
      alert('Ошибка при удалении услуги')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          is_active: !currentStatus
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update service status')
      }

      const updatedService = await response.json()
      setServices(services.map(service => service.id === id ? updatedService : service))
    } catch (err) {
      console.error('Error updating service status:', err)
      alert('Ошибка при обновлении статуса услуги')
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
        <div className={styles.loading}>Загрузка услуг...</div>
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
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/admin" className={styles.backLink}>
            <FaArrowLeft /> Вернуться в админку
          </Link>
          <h1>Управление услугами</h1>
          <Link href="/admin/services/new" className={styles.createButton}>
            + Создать услугу
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        {services.length === 0 ? (
          <div className={styles.empty}>
            <p>Услуги не найдены</p>
          </div>
        ) : (
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.imageContainer}>
                  <img 
                    src={service.image_url} 
                    alt={service.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <span className={`${styles.status} ${service.is_active ? styles.active : styles.inactive}`}>
                      {service.is_active ? 'Активна' : 'Неактивна'}
                    </span>
                  </div>
                  <p className={styles.description}>{service.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.date}>
                      {formatDate(service.created_at)}
                    </span>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => toggleActive(service.id, service.is_active)}
                        title={service.is_active ? 'Деактивировать' : 'Активировать'}
                      >
                        {service.is_active ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => router.push(`/admin/services/${service.id}/edit`)}
                        title="Редактировать"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(service.id)}
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

export default ServicesList

