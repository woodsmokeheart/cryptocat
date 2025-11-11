'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaEdit, FaFileAlt, FaEye } from 'react-icons/fa'
import styles from './LegalPagesList.module.css'
import type { LegalPage } from '@/types/legal-page'
import AdminBackLink from '../AdminBackLink/AdminBackLink'

export default function LegalPagesList() {
  const router = useRouter()
  const [pages, setPages] = useState<LegalPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/legal-pages')
      if (!response.ok) {
        throw new Error('Failed to fetch legal pages')
      }
      const data = await response.json()
      setPages(data)
    } catch (err) {
      console.error('Error fetching legal pages:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getPageName = (pageType: string) => {
    return pageType === 'privacy_policy' ? 'Privacy Policy' : 'Terms of Use'
  }

  const getPageSlug = (pageType: string) => {
    return pageType === 'privacy_policy' ? 'privacy-policy' : 'terms-of-use'
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <AdminBackLink href="/admin" className={styles.backLink} />
          <h1>Правовые документы</h1>
          <div className={styles.createButtons}>
            {!pages.some(p => p.page_type === 'privacy_policy') && (
              <Link href="/admin/legal-pages/privacy_policy/edit" className={styles.createButton}>
                + Privacy Policy
              </Link>
            )}
            {!pages.some(p => p.page_type === 'terms_of_use') && (
              <Link href="/admin/legal-pages/terms_of_use/edit" className={styles.createButton}>
                + Terms of Use
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>

      {pages.length === 0 ? (
        <div className={styles.empty}>
          <p>Правовые документы еще не созданы</p>
          <p className={styles.emptyHint}>Используйте кнопки в шапке для создания документов</p>
        </div>
      ) : (
        <div className={styles.pagesList}>
          {pages.map((page) => (
            <div key={page.id} className={styles.pageCard}>
              <div className={styles.pageHeader}>
                <div className={styles.pageIcon}>
                  <FaFileAlt />
                </div>
                <div className={styles.pageInfo}>
                  <h3 className={styles.pageTitle}>{getPageName(page.page_type)}</h3>
                  <p className={styles.pageSubtitle}>{page.title || 'Без заголовка'}</p>
                </div>
              </div>

              <div className={styles.pageContent}>
                <div 
                  className={styles.preview}
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>

              <div className={styles.pageActions}>
                <Link
                  href={`/admin/legal-pages/${page.page_type}/edit`}
                  className={styles.editButton}
                >
                  <FaEdit /> Редактировать
                </Link>
                <a
                  href={`/${getPageSlug(page.page_type)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewButton}
                >
                  <FaEye /> Просмотр
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      </main>
    </div>
  )
}

