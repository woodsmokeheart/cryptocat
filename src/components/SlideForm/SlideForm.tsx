'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Slide, CreateSlideInput, UpdateSlideInput } from '@/types/slide'
import { FaUpload, FaTimes, FaSpinner, FaArrowLeft } from 'react-icons/fa'
import styles from './SlideForm.module.css'

interface SlideFormProps {
  slideId?: string
}

const SlideForm = ({ slideId }: SlideFormProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<CreateSlideInput>({
    heading: '',
    title: '',
    title_accent: '',
    description: '',
    description_accent: '',
    link_url: '',
    link_text: '',
    background_image: '',
    order_index: 0,
    is_active: true
  })

  const fetchSlide = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/slides/${slideId}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch slide')
      }
      
      setFormData(data.slide)
      setPreviewImage(data.slide.background_image)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch slide')
    } finally {
      setLoading(false)
    }
  }, [slideId])

  useEffect(() => {
    if (slideId) {
      fetchSlide()
    }
  }, [slideId, fetchSlide])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Проверяем размер файла (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Размер изображения не должен превышать 5MB')
      return
    }

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'slides')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setFormData(prev => ({
        ...prev,
        background_image: data.url
      }))
      setPreviewImage(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setLoading(false)
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const url = slideId ? `/api/slides/${slideId}` : '/api/slides'
      const method = slideId ? 'PUT' : 'POST'
      
      const body = slideId 
        ? { id: slideId, ...formData } as UpdateSlideInput
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${slideId ? 'update' : 'create'} slide`)
      }

      router.push('/admin/slides')
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${slideId ? 'update' : 'create'} slide`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            onClick={() => router.push('/admin/slides')} 
            className={styles.backLink}
          >
            <FaArrowLeft /> Назад
          </button>
          <h1>{slideId ? 'Редактировать слайд' : 'Создать слайд'}</h1>
          <div></div>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.slideForm}>
          {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="heading">Заголовок (heading)</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            required
            placeholder="Например: Команда"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">Основной заголовок</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Например: Спокойствие - это"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title_accent">Акцентный заголовок</label>
          <input
            type="text"
            id="title_accent"
            name="title_accent"
            value={formData.title_accent}
            onChange={handleInputChange}
            required
            placeholder="Например: решение"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            placeholder="Например: Команда достойна называться"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description_accent">Акцентное описание</label>
          <input
            type="text"
            id="description_accent"
            name="description_accent"
            value={formData.description_accent}
            onChange={handleInputChange}
            required
            placeholder="Например: лучшей в своей области."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="link_url">Ссылка (необязательно)</label>
          <input
            type="url"
            id="link_url"
            name="link_url"
            value={formData.link_url || ''}
            onChange={handleInputChange}
            placeholder="https://example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="link_text">Текст ссылки (необязательно)</label>
          <input
            type="text"
            id="link_text"
            name="link_text"
            value={formData.link_text || ''}
            onChange={handleInputChange}
            placeholder="Например: Подробнее"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="order_index">Порядок отображения</label>
          <input
            type="number"
            id="order_index"
            name="order_index"
            value={formData.order_index || 0}
            onChange={handleInputChange}
            min="0"
          />
        </div>
      </div>

      <div className={styles.imageSection}>
        <label>Фоновое изображение</label>
        <div className={styles.imageUpload}>
          <input
            type="file"
            id="background_image"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.fileInput}
          />
          <label htmlFor="background_image" className={styles.uploadButton}>
            <FaUpload />
            {loading ? 'Загрузка...' : 'Выбрать изображение'}
          </label>
        </div>
        
        {previewImage && (
          <div className={styles.imagePreview}>
            <img src={previewImage} alt="Предпросмотр" />
            <button
              type="button"
              onClick={() => {
                setPreviewImage(null)
                setFormData(prev => ({ ...prev, background_image: '' }))
              }}
              className={styles.removeImage}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>


      <div className={styles.formActions}>
        <button
          type="button"
          onClick={() => router.push('/admin/slides')}
          className={styles.cancelButton}
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={saving || !formData.background_image}
          className={styles.submitButton}
        >
          {saving ? (
            <>
              <FaSpinner className={styles.spinner} />
              {slideId ? 'Обновление...' : 'Создание...'}
            </>
          ) : (
            slideId ? 'Обновить слайд' : 'Создать слайд'
          )}
        </button>
        </div>
        </form>
      </main>
    </div>
  )
}

export default SlideForm
