'use client'

import React from 'react'
import styles from './ServicesPage.module.css'

const ServicesPage: React.FC = () => {
  return (
    <div className={styles.servicesPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Our Services</h1>
        
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🔗</div>
            <h3 className={styles.serviceTitle}>Blockchain Development</h3>
            <p className={styles.serviceDescription}>
              Smart contracts, DApps, DeFi protocols, and custom blockchain solutions 
              tailored to your business needs.
            </p>
            <ul className={styles.serviceList}>
              <li>Smart Contract Development</li>
              <li>DeFi Applications</li>
              <li>NFT Marketplaces</li>
              <li>Token Development</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🌐</div>
            <h3 className={styles.serviceTitle}>Web Development</h3>
            <p className={styles.serviceDescription}>
              Modern, responsive websites and web applications built with the latest 
              technologies and best practices.
            </p>
            <ul className={styles.serviceList}>
              <li>React/Next.js Applications</li>
              <li>E-commerce Solutions</li>
              <li>API Development</li>
              <li>Performance Optimization</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>💰</div>
            <h3 className={styles.serviceTitle}>Cryptocurrency Consulting</h3>
            <p className={styles.serviceDescription}>
              Strategic guidance for crypto projects, tokenomics design, and 
              regulatory compliance assistance.
            </p>
            <ul className={styles.serviceList}>
              <li>Tokenomics Design</li>
              <li>ICO/IDO Strategy</li>
              <li>Regulatory Compliance</li>
              <li>Market Analysis</li>
            </ul>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>🎨</div>
            <h3 className={styles.serviceTitle}>UI/UX Design</h3>
            <p className={styles.serviceDescription}>
              Beautiful, intuitive user interfaces and experiences that engage 
              users and drive conversions.
            </p>
            <ul className={styles.serviceList}>
              <li>User Interface Design</li>
              <li>User Experience Research</li>
              <li>Prototyping</li>
              <li>Design Systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
