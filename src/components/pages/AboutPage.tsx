'use client'

import React from 'react'
import styles from './AboutPage.module.css'

const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>About CryptoCat</h1>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.text}>
            We are a cutting-edge digital agency specializing in blockchain technology, 
            cryptocurrency solutions, and innovative web development. Our mission is to 
            bridge the gap between traditional business and the decentralized future.
          </p>
        </div>
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>What We Do</h2>
          <div className={styles.services}>
            <div className={styles.serviceItem}>
              <h3>Blockchain Development</h3>
              <p>Smart contracts, DApps, and DeFi solutions</p>
            </div>
            <div className={styles.serviceItem}>
              <h3>Web Development</h3>
              <p>Modern, responsive websites and applications</p>
            </div>
            <div className={styles.serviceItem}>
              <h3>Cryptocurrency Consulting</h3>
              <p>Strategic guidance for crypto projects</p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Team</h2>
          <p className={styles.text}>
            We are a team of passionate developers, designers, and blockchain experts 
            who believe in the transformative power of technology. With years of 
            experience in both traditional web development and cutting-edge blockchain 
            solutions, were ready to help you navigate the digital future.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
