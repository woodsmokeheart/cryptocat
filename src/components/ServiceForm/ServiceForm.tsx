'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaArrowLeft, FaSave, FaTrash, FaImage } from 'react-icons/fa'
import { Service, CreateServiceData, UpdateServiceData } from '@/types/service'
import ImageUpload from '@/components/ImageUpload/ImageUpload'
import styles from './ServiceForm.module.css'

interface ServiceFormProps {
  serviceId?: string
}

const ServiceForm: React.FC<ServiceFormProps> = ({ serviceId }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    detail_page_url: '',
    mobile_accordion_button_text: 'Развернуть',
    display_order: 0
  })

  const isEditing = Boolean(serviceId)

  const fetchService = useCallback(async () => {
    if (!serviceId) return

    try {
      setLoading(true)
      const response = await fetch(`/api/services/${serviceId}`)
      
      if (!response.ok) {
        throw new Error('Услуга не найдена')
      }

      const service: Service = await response.json()
      
      setFormData({
        title: service.title,
        description: service.description,
        image_url: service.image_url,
        detail_page_url: service.detail_page_url,
        mobile_accordion_button_text: service.mobile_accordion_button_text || 'Развернуть',
        display_order: service.display_order
      })
    } catch (err) {
      console.error('Error fetching service:', err)
      setError('Ошибка загрузки услуги')
    } finally {
      setLoading(false)
    }
  }, [serviceId])

  useEffect(() => {
    if (isEditing) {
      fetchService()
    }
  }, [isEditing, fetchService])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Проверяем все обязательные поля
    if (!formData.title.trim()) {
      setError('Заполните заголовок')
      return
    }
    if (!formData.description.trim()) {
      setError('Заполните описание')
      return
    }
    if (!formData.image_url.trim()) {
      setError('Загрузите изображение')
      return
    }
    if (!formData.detail_page_url.trim()) {
      setError('Заполните URL страницы с описанием')
      return
    }
    if (!formData.mobile_accordion_button_text.trim()) {
      setError('Заполните текст кнопки аккордеона')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const requestData: CreateServiceData | UpdateServiceData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image_url: formData.image_url.trim(),
        detail_page_url: formData.detail_page_url.trim(),
        mobile_accordion_button_text: formData.mobile_accordion_button_text.trim(),
        display_order: formData.display_order
      }

      const url = isEditing ? `/api/services/${serviceId}` : '/api/services'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка сохранения')
      }

      router.push('/admin/services')
    } catch (err) {
      console.error('Error saving service:', err)
      setError(err instanceof Error ? err.message : 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!serviceId || !confirm('Вы уверены, что хотите удалить эту услугу?')) {
      return
    }

    try {
      setDeleting(true)
      
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления')
      }

      router.push('/admin/services')
    } catch (err) {
      console.error('Error deleting service:', err)
      alert('Ошибка удаления услуги')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка услуги...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/admin/services')}
          >
            <FaArrowLeft />
            Назад
          </button>
          <div className={styles.headerActions}>
            {isEditing && (
              <button 
                className={styles.deleteButton}
                onClick={handleDelete}
                disabled={deleting}
              >
                <FaTrash />
                {deleting ? 'Удаление...' : 'Удалить'}
              </button>
            )}
          </div>
          <h1 className={styles.title}>
            {isEditing ? 'Редактировать услугу' : 'Создать услугу'}
          </h1>
        </div>
      </div>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Заголовок *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={styles.input}
              placeholder="Введите заголовок услуги"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Описание *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={styles.textarea}
              placeholder="Введите описание услуги"
              rows={4}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FaImage /> Изображение *
            </label>
            <p className={styles.hint}>
              Загрузите изображение для услуги (максимум 5 MB). Форматы: JPEG, PNG, WebP, GIF
            </p>
            <ImageUpload
              onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              buttonText="Выбрать изображение"
            />
            {formData.image_url && (
              <div className={styles.imagePreview}>
                <Image 
                  src={formData.image_url} 
                  alt="Предпросмотр изображения"
                  width={300}
                  height={200}
                  style={{ width: '100%', height: 'auto' }}
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                  className={styles.removeImage}
                >
                  Удалить изображение
                </button>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              URL страницы с описанием *
            </label>
            <input
              type="text"
              value={formData.detail_page_url}
              onChange={(e) => setFormData(prev => ({ ...prev, detail_page_url: e.target.value }))}
              className={styles.input}
              placeholder="/services/[id] или внешний URL"
              required
            />
            <div className={styles.hint}>
              URL страницы, на которую будет вести кнопка &quot;Подробнее&quot;.
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Текст кнопки аккордеона (мобильная версия) *
            </label>
            <input
              type="text"
              value={formData.mobile_accordion_button_text}
              onChange={(e) => setFormData(prev => ({ ...prev, mobile_accordion_button_text: e.target.value }))}
              className={styles.input}
              placeholder="Развернуть"
              required
            />
            <div className={styles.hint}>
              Текст кнопки, которая раскрывает контент в мобильной версии (аккордеон)
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Порядок отображения *
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
              className={styles.input}
              placeholder="0"
              required
              min="0"
            />
            <div className={styles.hint}>
              Меньшее значение = выше в списке
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="submit"
              disabled={saving}
              className={styles.saveButton}
            >
              <FaSave />
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServiceForm

