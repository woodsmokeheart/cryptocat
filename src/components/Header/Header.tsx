'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useModal } from '../../hooks/useModal'
import styles from './Header.module.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const aboutModal = useModal('about')
  const servicesModal = useModal('services')
  const worksModal = useModal('works')
  const newsModal = useModal('news')
  const contactModal = useModal('contact')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
            <div className={styles.mainNavigation}>
              {/* Mobile toggle */}
              <button 
                className={styles.navbarToggle}
                onClick={toggleMenu}
                aria-label="Toggle navigation"
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
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={aboutModal.openModal}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={servicesModal.openModal}
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={worksModal.openModal}
                  >
                    Works
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={newsModal.openModal}
                  >
                    News
                  </button>
                </li>
                <li>
                  <button 
                    className={styles.linkUnderlineMenu} 
                    onClick={contactModal.openModal}
                  >
                    Contact
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