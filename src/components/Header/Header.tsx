'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useModal } from '../../hooks/useModal'
import styles from './Header.module.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const aboutModal = useModal('about')
  const servicesModal = useModal('services')
  const worksModal = useModal('works')
  const newsModal = useModal('news')
  const contactModal = useModal('contact')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    closeMenu()
  }

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Navigation wrapper */}
      <div className={styles.navbarWrapper}></div>
      
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.containerFluid}>
          <div className={styles.navbarHeader}>
            {/* Logo */}
            <div className={styles.logo}>
              <a className={styles.logoBrand} href="#">
                <Image 
                  className={styles.logoImg} 
                  alt="CryptoCat Logo" 
                  src="/img/textLogo.png"
                  width={40}
                  height={40}
                  sizes="100vw"
                  priority
                />
              </a>
            </div>

            {/* Main navigation */}
            <div className={styles.mainNavigation} ref={menuRef}>
              {/* Mobile toggle */}
              <button 
                className={styles.navbarToggle}
                onClick={toggleMenu}
                aria-label="Переключить навигацию"
              >
                <span className={styles.iconBar}></span>
                <span className={styles.iconBar}></span>
                <span className={styles.iconBar}></span>
              </button>

              {/* Navigation menu */}
              <ul className={`${styles.navbarNav} ${isMenuOpen ? styles.show : ''}`}>
                <li>
                  <button 
                    className={`${styles.linkUnderlineMenu} ${styles.active}`} 
                    onClick={scrollToTop}
                  >
                    Главная
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={() => {
                      aboutModal.openModal()
                      closeMenu()
                    }}
                  >
                    О нас
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={() => {
                      servicesModal.openModal()
                      closeMenu()
                    }}
                  >
                    Услуги
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={() => {
                      worksModal.openModal()
                      closeMenu()
                    }}
                  >
                    Работы
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={() => {
                      newsModal.openModal()
                      closeMenu()
                    }}
                  >
                    Новости
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={() => {
                      contactModal.openModal()
                      closeMenu()
                    }}
                  >
                    Контакты
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header