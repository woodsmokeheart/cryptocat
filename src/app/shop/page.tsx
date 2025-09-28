'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { FaBullseye, FaBolt, FaHome } from 'react-icons/fa'
import ShopLayout from '../layouts/ShopLayout'
import styles from './page.module.css'

const ShopPage: React.FC = () => {
  const router = useRouter()

  const navigateToHome = () => {
    router.push('/')
  }

  return (
    <ShopLayout>
      <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.homeButton} onClick={navigateToHome}>
          <FaHome /> На главную
        </button>
        <h1 className={styles.title}>CryptoCat Store</h1>
        <div className={styles.placeholder}>
          <h2 className={styles.subtitle}>Магазин в разработке</h2>
          <p className={styles.description}>
            Мы работаем над созданием лучшего магазина крипто-мерчандайза и аксессуаров. 
            Следите за обновлениями о дате запуска и эксклюзивных возможностях раннего доступа.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3><FaBullseye /> Эксклюзивный Мерч</h3>
              <p>Уникальная коллекция одежды и аксессуаров с брендингом CryptoCat. Качественные материалы и инновационный дизайн, представляющий будущее блокчейн технологий.</p>
            </div>
            <div className={styles.feature}>
              <h3><FaBolt /> Крипто Аксессуары</h3>
              <p>Аппаратные кошельки, флеш-накопители и другие устройства для работы с криптовалютами. Безопасные и надежные инструменты для управления вашими цифровыми активами.</p>
            </div>
          </div>
          
          <div className={styles.additionalInfo}>
            <h3 className={styles.infoTitle}>Скоро</h3>
            <p className={styles.infoText}>
              Мы усердно работаем над созданием лучшего крипто-мерчандайза и аксессуаров. 
              Следите за обновлениями о дате запуска и эксклюзивных возможностях раннего доступа.
            </p>
            <div className={styles.contactInfo}>
              <p>Подписывайтесь на нас в социальных сетях для получения последних обновлений!</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ShopLayout>
  )
}

export default ShopPage

