'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa'
import AdminBackLink from '../AdminBackLink/AdminBackLink'
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
            <AdminBackLink href="/admin/posts" className={styles.backLink} />
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
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.coverImage}>
            <Image 
              src={post.cover_image}
              alt={post.title}
              fill
              className={styles.coverImageEl}
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className={styles.meta}>
            {post.published ? (
              <span className={styles.badgePublished} title="Опубликован">
                <FaCheck />
              </span>
            ) : (
              <span className={styles.badgeDraft} title="Черновик">
                <FaEdit />
              </span>
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

