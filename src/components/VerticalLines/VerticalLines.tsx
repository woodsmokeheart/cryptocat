'use client'

import React from 'react'
import styles from './VerticalLines.module.css'

const VerticalLines = () => {
  return (
    <div className={styles.verticalLinesWrapper}>
      <div className={styles.verticalLines}>
        <div className={styles.verticalEffect}></div>
        <div className={styles.verticalEffect}></div>
        <div className={styles.verticalEffect}></div>
        <div className={styles.verticalEffect}></div>
      </div>
    </div>
  )
}

export default VerticalLines
