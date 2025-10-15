'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import styles from './AdminDashboard.module.css'

interface AdminDashboardProps {
  user: User
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
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
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <h3>Статистика</h3>
            <p>Просмотр аналитики и статистики сайта</p>
            <div className={styles.cardValue}>-</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📝</div>
            <h3>Контент</h3>
            <p>Управление контентом и статьями</p>
            <div className={styles.cardValue}>-</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>👥</div>
            <h3>Пользователи</h3>
            <p>Управление пользователями системы</p>
            <div className={styles.cardValue}>1</div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>⚙️</div>
            <h3>Настройки</h3>
            <p>Конфигурация системы</p>
            <div className={styles.cardValue}>-</div>
          </div>
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

