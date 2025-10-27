'use client'

import React from 'react'
import styles from './BottomCredits.module.css'

const BottomCredits = () => {
  return (
    <div className={styles.bottomCredits}>
      <h4 className={`${styles.bottomCreditsLead} ${styles.bottomCreditsLeadColor}`}>
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        <span className={styles.separator}> • </span>
        <a href="/terms-of-use" target="_blank" rel="noopener noreferrer">Terms of Use</a>
      </h4>
    </div>
  )
}

export default BottomCredits
