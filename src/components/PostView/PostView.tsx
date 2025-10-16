'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa'
import type { Post } from '@/types/post'
import styles from './PostView.module.css'

interface PostViewProps {
  post: Post
}

export default function PostView({ post }: PostViewProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.')) {
      return
    }

    setDeleting(true)

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      router.push('/admin/posts')
      router.refresh()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Ошибка при удалении поста')
      setDeleting(false)
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <Link href="/admin/posts" className={styles.backLink}>
              <FaArrowLeft /> К списку постов
            </Link>
          </div>
          <div className={styles.headerRight}>
            <Link 
              href={`/admin/posts/${post.id}/edit`}
              className={styles.editButton}
            >
              <FaEdit /> Редактировать
            </Link>
            <button
              onClick={handleDelete}
              className={styles.deleteButton}
              disabled={deleting}
            >
              <FaTrash /> {deleting ? 'Удаление...' : 'Удалить'}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.article}>
          <div className={styles.articleHeader}>
            <h1>{post.title}</h1>
            <div className={styles.meta}>
              {post.published ? (
                <span className={styles.badgePublished}>Опубликован</span>
              ) : (
                <span className={styles.badgeDraft}>Черновик</span>
              )}
              <time className={styles.date}>
                {new Date(post.created_at).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </div>
          </div>

          {post.excerpt && (
            <div className={styles.excerpt}>
              <p>{post.excerpt}</p>
            </div>
          )}

          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.articleFooter}>
            <p className={styles.updatedAt}>
              Последнее обновление:{' '}
              {new Date(post.updated_at).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}

