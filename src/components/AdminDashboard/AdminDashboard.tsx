'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaFileAlt, FaImages, FaGavel } from 'react-icons/fa'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import styles from './AdminDashboard.module.css'

interface AdminDashboardProps {
  user: User
  postsCount?: number
  slidesCount?: number
}

export default function AdminDashboard({ user, postsCount = 0, slidesCount = 0 }: AdminDashboardProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1>CryptoCat Admin</h1>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userEmail}>{user.email}</span>
            <button 
              onClick={handleLogout} 
              className={styles.logoutButton}
              disabled={loading}
            >
              {loading ? 'Выход...' : 'Выйти'}
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeCard}>
          <h2>Добро пожаловать в админ-панель!</h2>
          <p>Вы успешно вошли в систему управления CryptoCat</p>
        </div>

        <div className={styles.dashboardGrid}>
          <Link href="/admin/posts" className={styles.card}>
            <div className={styles.cardIcon}>
              <FaFileAlt />
            </div>
            <h3>Посты</h3>
            <p>Управление постами и статьями</p>
            <div className={styles.cardValue}>{postsCount}</div>
          </Link>

          <Link href="/admin/slides" className={styles.card}>
            <div className={styles.cardIcon}>
              <FaImages />
            </div>
            <h3>Слайды</h3>
            <p>Управление слайдами главной страницы</p>
            <div className={styles.cardValue}>{slidesCount}</div>
          </Link>

          <Link href="/admin/legal-pages" className={styles.card}>
            <div className={styles.cardIcon}>
              <FaGavel />
            </div>
            <h3>Правовые документы</h3>
            <p>Управление Privacy Policy и Terms of Use</p>
            <div className={styles.cardValue}>2</div>
          </Link>
        </div>

        <div className={styles.infoSection}>
          <h3>Системная информация</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>User ID:</span>
              <span className={styles.infoValue}>{user.id}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email:</span>
              <span className={styles.infoValue}>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Последний вход:</span>
              <span className={styles.infoValue}>
                {user.last_sign_in_at 
                  ? new Date(user.last_sign_in_at).toLocaleString('ru-RU')
                  : 'N/A'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Создан:</span>
              <span className={styles.infoValue}>
                {new Date(user.created_at).toLocaleString('ru-RU')}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

