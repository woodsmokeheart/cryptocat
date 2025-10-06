"use client"

import React from 'react'
import styles from './ContactContent.module.css'
import { MdOutlineEmail } from 'react-icons/md'
import { FaTelegramPlane, FaLink } from 'react-icons/fa'
import { SiTradingview } from 'react-icons/si'
import { FiExternalLink } from 'react-icons/fi'

const ContactContent: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Email */}
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <MdOutlineEmail color="#FF7A3D" size={22} />
          <h4 className={styles.cardTitle}>Email</h4>
        </div>
        <div className={styles.linkRowCenterMobile}>
          <a className={styles.pill}
             href="mailto:cryptocatagency@gmail.com">
            cryptocatagency@gmail.com
          </a>
        </div>
      </div>

      {/* Telegram */}
      <div className={`${styles.card} ${styles.cardTelegram}`}>
        <div className={styles.headerRow}>
          <FaTelegramPlane color="#29A8E0" size={20} />
          <h4 className={styles.cardTitle}>Telegram</h4>
        </div>
        <div className={styles.linkRowCenterMobile}>
          <a className={`${styles.pill} ${styles.pillTelegram}`}
             href="https://t.me/cryptocat_manager"
             target="_blank"
             rel="noopener noreferrer">
            cryptocat_manager <FiExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Referral */}
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <FaLink color="#FF7A3D" size={18} />
          <h4 className={styles.cardTitle}>Реферальная программа Bingx</h4>
        </div>
        <div className={styles.linkRowCenterMobile}>
          <a className={styles.pill}
             href="https://bingx.com/invite/MT6UVTEUZ"
             target="_blank"
             rel="noopener noreferrer">
            Реферальная ссылка <FiExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* TradingView */}
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <SiTradingview color="#79C6F6" size={18} />
          <h4 className={styles.cardTitle}>TradingView</h4>
        </div>
        <div className={styles.chipsRow}>
          <a className={styles.chip}
             href="https://ru.tradingview.com/u/cryptocatagency"
             target="_blank"
             rel="noopener noreferrer">
            Основной канал <FiExternalLink size={14} />
          </a>
          <a className={styles.chip}
             href="https://ru.tradingview.com/u/CryptoCat_Squad"
             target="_blank"
             rel="noopener noreferrer">
            Вторичный канал <FiExternalLink size={14} />
          </a>
          <a className={styles.chip}
             href="https://ru.tradingview.com/u/cryptocatagency_kitty"
             target="_blank"
             rel="noopener noreferrer">
            Третичный канал <FiExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactContent


