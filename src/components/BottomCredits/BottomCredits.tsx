'use client'

import React from 'react'
import styles from './BottomCredits.module.css'

const BottomCredits = () => {
  return (
    <div className={styles.bottomCredits}>
      <h4 className={`${styles.bottomCreditsLead} ${styles.bottomCreditsFirst}`}>
        (+1) 234 56 789
      </h4>
      <h4 className={`${styles.bottomCreditsLead} ${styles.bottomCreditsLeadColor}`}>
        <a href="mailto:ultimex@ultimex.com">ultimex@ultimex.com</a>
      </h4>
    </div>
  )
}

export default BottomCredits
