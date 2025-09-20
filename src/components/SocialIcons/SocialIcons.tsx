'use client'

import React from 'react'
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'
import styles from './SocialIcons.module.css'

const SocialIcons = () => {
  return (
    <div className={styles.socialIcons}>
      <ul>
        <li>
          <a href="#" className={styles.socialLink}>
            <FaInstagram className={styles.socialIcon} />
            <span>INSTAGRAM</span>
          </a>
        </li>
        <li>
          <a href="#" className={styles.socialLink}>
            <FaFacebookF className={styles.socialIcon} />
            <span>FACEBOOK</span>
          </a>
        </li>
        <li>
          <a href="#" className={styles.socialLink}>
            <FaTwitter className={styles.socialIcon} />
            <span>TWITTER</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SocialIcons
