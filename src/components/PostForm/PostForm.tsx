'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaCheck, FaEdit, FaArrowLeft, FaImage } from 'react-icons/fa'
import TipTapEditor from '@/components/TipTapEditor/TipTapEditor'
import { extractImagesFromContent } from '@/lib/images'
import type { Post } from '@/types/post'
import styles from './PostForm.module.css'

interface PostFormProps {
  mode: 'create' | 'edit'
  post?: Post
}

export default function PostForm({ mode, post }: PostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [published, setPublished] = useState(post?.published || false)
  const [coverImage, setCoverImage] = useState<string | null>(post?.cover_image || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Извлекаем изображения из контента
  const imagesInContent = extractImagesFromContent(content)

  const handleSubmit = async (publishStatus: boolean) => {
    setError(null)
    setLoading(true)

    try {
      const url = mode === 'create' 
        ? '/api/posts'
        : `/api/posts/${post?.id}`
      
      const method = mode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          published: publishStatus,
          cover_image: coverImage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка при сохранении поста')
      }

      const data = await response.json()
      router.push(`/admin/posts/${data.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка')
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{mode === 'create' ? 'Создать пост' : 'Редактировать пост'}</h1>
          <Link href="/admin/posts" className={styles.backLink}>
            <FaArrowLeft /> К списку постов
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Заголовок</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Введите заголовок поста"
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt">Краткое описание</label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Краткое описание поста (отображается в карточке)"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Содержимое</label>
            <TipTapEditor
              content={content}
              onChange={setContent}
              placeholder="Начните писать содержимое поста..."
            />
          </div>

          {imagesInContent.length > 0 && (
            <div className={styles.coverImageSection}>
              <label className={styles.coverImageLabel}>
                <FaImage /> Обложка поста
              </label>
              <p className={styles.coverImageHint}>
                Выберите изображение из поста для обложки (отображается в карточке)
              </p>
              <div className={styles.coverImageGrid}>
                <div
                  className={`${styles.coverImageItem} ${!coverImage ? styles.selected : ''}`}
                  onClick={() => setCoverImage(null)}
                >
                  <div className={styles.noCoverPlaceholder}>
                    Без обложки
                  </div>
                </div>
                {imagesInContent.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`${styles.coverImageItem} ${coverImage === imageUrl ? styles.selected : ''}`}
                    onClick={() => setCoverImage(imageUrl)}
                  >
                    <img src={imageUrl} alt={`Изображение ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.actions}>
            <Link 
              href="/admin/posts" 
              className={styles.cancelButton}
            >
              Отмена
            </Link>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className={styles.draftButton}
              disabled={loading}
            >
              <FaEdit /> {loading ? 'Сохранение...' : 'Сохранить как черновик'}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              className={styles.publishButton}
              disabled={loading}
            >
              <FaCheck /> {loading ? 'Публикация...' : 'Опубликовать'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

