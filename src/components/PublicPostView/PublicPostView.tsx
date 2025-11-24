'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import type { Post } from '@/types/post'
import styles from './PublicPostView.module.css'

interface PublicPostViewProps {
  post: Post
}

export default function PublicPostView({ post }: PublicPostViewProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/lenta" className={styles.backLink}>
            <FaArrowLeft /> К ленте
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <article className={styles.article}>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.coverImage}>
            {imageLoading && !imageError && (
              <div className={styles.imageSkeleton}>
                <div className={styles.skeletonShimmer} />
              </div>
            )}
            {!imageError && (
              <img
                src={post.cover_image}
                alt={post.title}
                className={`${styles.coverImageEl} ${imageLoading ? styles.imageLoading : styles.imageLoaded}`}
                loading="lazy"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false)
                  setImageError(true)
                }}
              />
            )}
            {imageError && (
              <div className={styles.imageError}>
                <span>Изображение не загружено</span>
              </div>
            )}
          </div>

          <div className={styles.meta}>
            <span className={styles.publishedIcon} title="Опубликован">
              <FaCheck />
            </span>
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
