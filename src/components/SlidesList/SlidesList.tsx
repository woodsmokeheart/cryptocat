'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Slide } from '@/types/slide'
import { FaArrowLeft, FaEdit, FaTrash, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import styles from './SlidesList.module.css'

const SlidesList = () => {
  const router = useRouter()
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/slides')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch slides')
      }
      
      setSlides(data.slides || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот слайд?')) {
      return
    }

    try {
      const response = await fetch(`/api/slides/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete slide')
      }

      setSlides(slides.filter(slide => slide.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete slide')
    }
  }

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/slides/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: !isActive }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to update slide')
      }

      setSlides(slides.map(slide => 
        slide.id === id ? { ...slide, is_active: !isActive } : slide
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update slide')
    }
  }

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const slideIndex = slides.findIndex(slide => slide.id === id)
    if (slideIndex === -1) return

    const newIndex = direction === 'up' ? slideIndex - 1 : slideIndex + 1
    if (newIndex < 0 || newIndex >= slides.length) return

    const newSlides = [...slides]
    const [movedSlide] = newSlides.splice(slideIndex, 1)
    newSlides.splice(newIndex, 0, movedSlide)

    // Обновляем order_index для всех слайдов
    const updatedSlides = newSlides.map((slide, index) => ({
      ...slide,
      order_index: index
    }))

    setSlides(updatedSlides)

    // Сохраняем новый порядок в базе данных
    try {
      await Promise.all(
        updatedSlides.map(slide =>
          fetch(`/api/slides/${slide.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_index: slide.order_index }),
          })
        )
      )
    } catch (err) {
      setError('Failed to reorder slides')
      // Восстанавливаем исходный порядок при ошибке
      fetchSlides()
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка слайдов...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Ошибка: {error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/admin" className={styles.backLink}>
            <FaArrowLeft /> Назад
          </Link>
          <h1>Управление слайдами</h1>
          <Link href="/admin/slides/new" className={styles.createButton}>
            + Создать слайд
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        {slides.length === 0 ? (
          <div className={styles.empty}>
            <p>Слайдов пока нет</p>
            <p className={styles.emptyHint}>Используйте кнопку &quot;Создать слайд&quot; в шапке для добавления первого слайда</p>
          </div>
        ) : (
          <div className={styles.slidesList}>
            {slides.map((slide, index) => (
        <div key={slide.id} className={`${styles.slideCard} ${!slide.is_active ? styles.inactive : ''}`}>
          <div className={styles.slidePreview}>
            <div 
              className={styles.slideBackground}
              style={{ backgroundImage: `url(${slide.background_image})` }}
            />
            <div className={styles.slideOverlay}>
              <div className={styles.slideContent}>
                <h4 className={styles.slideHeading}>{slide.heading}</h4>
                <h2 className={styles.slideTitle}>
                  {slide.title} <span className={styles.slideTitleAccent}>{slide.title_accent}</span>
                </h2>
                <p className={styles.slideDescription}>
                  {slide.description} <span className={styles.slideDescriptionAccent}>{slide.description_accent}</span>
                </p>
                {slide.link_url && (
                  <a href={slide.link_url} className={styles.slideLink} target="_blank" rel="noopener noreferrer">
                    {slide.link_text || 'Подробнее'}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          <div className={styles.slideActions}>
            <div className={styles.slideInfo}>
              <span className={styles.slideOrder}>#{slide.order_index + 1}</span>
              <span className={`${styles.slideStatus} ${slide.is_active ? styles.active : styles.inactive}`}>
                {slide.is_active ? 'Активен' : 'Неактивен'}
              </span>
            </div>
            
            <div className={styles.slideControls}>
              <button
                onClick={() => handleReorder(slide.id, 'up')}
                disabled={index === 0}
                className={styles.controlButton}
                title="Переместить вверх"
              >
                <FaArrowUp />
              </button>
              <button
                onClick={() => handleReorder(slide.id, 'down')}
                disabled={index === slides.length - 1}
                className={styles.controlButton}
                title="Переместить вниз"
              >
                <FaArrowDown />
              </button>
              <button
                onClick={() => handleToggleActive(slide.id, slide.is_active)}
                className={`${styles.controlButton} ${slide.is_active ? styles.active : ''}`}
                title={slide.is_active ? 'Скрыть слайд' : 'Показать слайд'}
              >
                {slide.is_active ? <FaEye /> : <FaEyeSlash />}
              </button>
              <a
                href={`/admin/slides/${slide.id}/edit`}
                className={styles.controlButton}
                title="Редактировать"
              >
                <FaEdit />
              </a>
              <button
                onClick={() => handleDelete(slide.id)}
                className={`${styles.controlButton} ${styles.delete}`}
                title="Удалить"
              >
                <FaTrash />
              </button>
            </div>
          </div>
            </div>
          ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default SlidesList
