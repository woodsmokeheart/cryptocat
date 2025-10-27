'use client'

import React from 'react'
import { FaYoutube, FaTelegramPlane } from 'react-icons/fa'
import { SiTradingview } from 'react-icons/si'
import styles from './SocialIcons.module.css'

const SocialIcons = () => {
  return (
    <div className={styles.socialIcons}>
      <ul>
        <li>
          <a 
            href="https://youtube.com/@cryptocatagency?si=eH9B_x_9naUD9uvG" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaYoutube className={styles.socialIcon} />
            <span>YOUTUBE</span>
          </a>
        </li>
        <li>
          <a 
            href="https://t.me/cryptocatagency" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaTelegramPlane className={styles.socialIcon} />
            <span>TELEGRAM</span>
          </a>
        </li>
        <li>
          <a 
            href="https://ru.tradingview.com/u/cryptocatagency" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <SiTradingview className={styles.socialIcon} />
            <span>TradingView</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SocialIcons
