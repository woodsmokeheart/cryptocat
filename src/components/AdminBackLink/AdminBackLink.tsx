'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import styles from './AdminBackLink.module.css'

interface AdminBackLinkProps {
  href: string
  className?: string
  children?: ReactNode
}

const AdminBackLink: React.FC<AdminBackLinkProps> = ({
  href,
  className,
  children = 'Назад'
}) => {
  const combinedClassName = className
    ? `${styles.link} ${className}`
    : styles.link

  return (
    <Link href={href} className={combinedClassName}>
      <FaArrowLeft className={styles.icon} />
      <span>{children}</span>
    </Link>
  )
}

export default AdminBackLink

