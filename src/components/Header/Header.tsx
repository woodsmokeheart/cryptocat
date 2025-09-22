'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
                  <a className={`${styles.linkUnderlineMenu} ${styles.active}`} href="#home">Home</a>
                </li>
                <li>
                  <a className={styles.linkUnderlineMenu} href="#about">About</a>
                </li>
                <li>
                  <a className={styles.linkUnderlineMenu} href="#services">Services</a>
                </li>
                <li>
                  <a className={styles.linkUnderlineMenu} href="#works">Works</a>
                </li>
                <li>
                  <a className={styles.linkUnderlineMenu} href="#news">News</a>
                </li>
                <li>
                  <a className={styles.linkUnderlineMenu} href="#contact">Contact</a>
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