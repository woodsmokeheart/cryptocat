'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaSave, FaTrash, FaUpload, FaImage } from 'react-icons/fa'
import { FaqItem, CreateFaqItemData, UpdateFaqItemData } from '@/types/faq'
import TipTapEditor from '@/components/TipTapEditor/TipTapEditor'
import ImageUpload from '@/components/ImageUpload/ImageUpload'
import styles from './FaqForm.module.css'

interface FaqFormProps {
  faqId?: string
}

const FaqForm: React.FC<FaqFormProps> = ({ faqId }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Состояние imageUploading больше не нужно - используется в ImageUpload
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image_url: '',
    display_order: 0
  })

  const [content, setContent] = useState('')

  // Убран старый редактор, заменен на TipTapEditor

  const isEditing = Boolean(faqId)

  const fetchFaq = useCallback(async () => {
    if (!faqId) return

    try {
      setLoading(true)
      const response = await fetch(`/api/faq/${faqId}`)
      
      if (!response.ok) {
        throw new Error('FAQ не найден')
      }

      const faq: FaqItem = await response.json()
      
      setFormData({
        title: faq.title,
        slug: faq.slug,
        description: faq.description,
        image_url: faq.image_url || '',
        display_order: faq.display_order
      })

      setContent(faq.content || '')
    } catch (err) {
      console.error('Error fetching FAQ:', err)
      setError('Ошибка загрузки FAQ')
    } finally {
      setLoading(false)
    }
  }, [faqId])

  useEffect(() => {
    if (isEditing) {
      fetchFaq()
    }
  }, [isEditing, fetchFaq])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9а-я]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: !isEditing ? generateSlug(value) : prev.slug
    }))
  }

  // Функция загрузки изображения теперь в ImageUpload компоненте

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.slug.trim() || !formData.description.trim()) {
      setError('Заполните все обязательные поля')
      return
    }

    if (!content.trim()) {
      setError('Добавьте контент')
      return
    }

    try {
      setSaving(true)
      setError(null)

      const requestData: CreateFaqItemData | UpdateFaqItemData = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
        content: content,
        image_url: formData.image_url || undefined,
        display_order: formData.display_order
      }

      const url = isEditing ? `/api/faq/${faqId}` : '/api/faq'
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

      router.push('/admin/faq')
    } catch (err) {
      console.error('Error saving FAQ:', err)
      setError(err instanceof Error ? err.message : 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!faqId || !confirm('Вы уверены, что хотите удалить этот FAQ?')) {
      return
    }

    try {
      setDeleting(true)
      
      const response = await fetch(`/api/faq/${faqId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Ошибка удаления')
      }

      router.push('/admin/faq')
    } catch (err) {
      console.error('Error deleting FAQ:', err)
      alert('Ошибка удаления FAQ')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка FAQ...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/admin/faq')}
          >
            <FaArrowLeft />
            Назад
          </button>
          <h1 className={styles.title}>
            {isEditing ? 'Редактировать FAQ' : 'Создать FAQ'}
          </h1>
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
              onChange={(e) => handleTitleChange(e.target.value)}
              className={styles.input}
              placeholder="Введите заголовок FAQ"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Slug (URL) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className={styles.input}
              placeholder="url-slug"
              required
            />
            <div className={styles.hint}>
              Будет доступен по адресу: /faq/{formData.slug}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Описание *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={styles.textarea}
              placeholder="Краткое описание FAQ"
              rows={3}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              <FaImage /> Изображение обложки
            </label>
            <p className={styles.hint}>
              Загрузите изображение для FAQ (максимум 5 MB). Форматы: JPEG, PNG, WebP, GIF
            </p>
            <ImageUpload
              onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              buttonText="Выбрать изображение"
            />
            {formData.image_url && (
              <div className={styles.imagePreview}>
                <img src={formData.image_url} alt="Предпросмотр изображения" />
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
              Порядок отображения
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
              className={styles.input}
              placeholder="0"
            />
            <div className={styles.hint}>
              Меньшее значение = выше в списке
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Контент *
            </label>
            <TipTapEditor
              content={content}
              onChange={setContent}
              placeholder="Напишите содержание FAQ..."
            />
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

export default FaqForm
