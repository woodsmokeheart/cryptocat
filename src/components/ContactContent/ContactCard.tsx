"use client"

import React, { PropsWithChildren } from 'react'
import styles from './ContactCard.module.css'

type ContactCardProps = PropsWithChildren<{
  className?: string
  variant?: 'email' | 'telegram' | 'referral' | 'trading' | 'youtube'
}>

const ContactCard: React.FC<ContactCardProps> = ({ className, variant, children }) => {
  const variantClass = variant 
    ? styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`]
    : ''
  return (
    <div className={`${styles.card} ${variantClass} ${className || ''}`.trim()}>
      <div className={styles.geo} aria-hidden>
        <span className={`${styles.gCircle} ${styles.g1}`} />
        <span className={`${styles.gCircle2} ${styles.g2}`} />
        <span className={`${styles.gTriangle} ${styles.g2}`} />
        <span className={`${styles.gSquare} ${styles.g3}`} />
        <span className={`${styles.gDot} ${styles.g4}`} />
        <span className={`${styles.gDot} ${styles.g5}`} />
      </div>
      {children}
    </div>
  )
}

export default ContactCard


