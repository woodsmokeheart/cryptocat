'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaCheck, FaEdit, FaArrowLeft } from 'react-icons/fa'
import type { PostsResponse } from '@/types/post'
import { generateSmartPagination } from '@/lib/pagination'
import styles from './PublicPostsList.module.css'

interface PublicPostsListProps {
  postsData: PostsResponse
}

interface PostCardProps {
  post: {
    id: string
    title: string
    cover_image: string
    excerpt: string | null
    created_at: string
  }
}

function PostCard({ post }: PostCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <article className={styles.card}>
      <div className={styles.cardCover}>
        {imageLoading && !imageError && (
          <div className={styles.imageSkeleton}>
            <div className={styles.skeletonShimmer} />
          </div>
        )}
        {!imageError && (
          <img
            src={post.cover_image}
            alt={post.title}
            className={`${styles.cardCoverImg} ${imageLoading ? styles.imageLoading : styles.imageLoaded}`}
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

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{post.title}</h3>
        </div>
        
        <p className={styles.excerpt}>
          {post.excerpt || 'Нет описания'}
        </p>
      
        <div className={styles.cardFooter}>
          <div className={styles.dateAndStatus}>
            <time className={styles.date}>
              {new Date(post.created_at).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <div className={styles.statusIcon}>
              <FaCheck className={styles.publishedIcon} title="Опубликован" />
            </div>
          </div>
          
          <div className={styles.actions}>
            <Link 
              href={`/lenta/${post.id}`}
              className={styles.viewButton}
            >
              Читать
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function PublicPostsList({ postsData }: PublicPostsListProps) {
  const router = useRouter()
  const { posts, page, totalPages } = postsData

  const handlePageChange = (newPage: number) => {
    router.push(`/lenta?page=${newPage}`)
  }

  // Генерируем умную пагинацию
  const paginationItems = generateSmartPagination(page, totalPages)

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.backLink}>
            <FaArrowLeft /> Назад
          </Link>
          <div className={styles.titleSection}>
            <h1>Лента новостей</h1>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>Пока нет опубликованных постов</p>
            <p className={styles.emptyHint}>Следите за обновлениями!</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={styles.pageButton}
                >
                  ← Назад
                </button>
                
                <div className={styles.pageNumbers}>
                  {paginationItems.map((item, index) => (
                    item.type === 'ellipsis' ? (
                      <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                        {item.label}
                      </span>
                    ) : (
                      <button
                        key={item.value}
                        onClick={() => handlePageChange(item.value)}
                        className={item.value === page ? styles.pageButtonActive : styles.pageButton}
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
                
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className={styles.pageButton}
                >
                  Вперёд →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
