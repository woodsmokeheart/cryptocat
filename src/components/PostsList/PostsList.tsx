'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaCheck, FaEdit } from 'react-icons/fa'
import type { PostsResponse } from '@/types/post'
import styles from './PostsList.module.css'

interface PostsListProps {
  postsData: PostsResponse
}

export default function PostsList({ postsData }: PostsListProps) {
  const router = useRouter()
  const { posts, page, totalPages } = postsData

  const handlePageChange = (newPage: number) => {
    router.push(`/admin/posts?page=${newPage}`)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/admin" className={styles.backLink}>
            <FaArrowLeft /> Вернуться в админку
          </Link>
          <h1>Управление постами</h1>
          <Link href="/admin/posts/new" className={styles.createButton}>
            + Создать пост
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        {posts.length === 0 ? (
          <div className={styles.empty}>
            <p>Постов пока нет</p>
            <p className={styles.emptyHint}>Используйте кнопку &quot;Создать пост&quot; в шапке для добавления первого поста</p>
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {posts.map((post) => (
                <article key={post.id} className={styles.card}>
                  {post.cover_image && (
                    <div className={styles.cardCover}>
                      <img src={post.cover_image} alt={post.title} />
                    </div>
                  )}
                  
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
                        {post.published ? (
                          <FaCheck className={styles.publishedIcon} title="Опубликован" />
                        ) : (
                          <FaEdit className={styles.draftIcon} title="Черновик" />
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.actions}>
                      <Link 
                        href={`/admin/posts/${post.id}`}
                        className={styles.viewButton}
                      >
                        Просмотр
                      </Link>
                    </div>
                  </div>
                  </div>
                </article>
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={pageNum === page ? styles.pageButtonActive : styles.pageButton}
                    >
                      {pageNum}
                    </button>
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

