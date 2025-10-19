'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { FaImage, FaTimes, FaSpinner } from 'react-icons/fa'
import { uploadImage } from '@/lib/images'
import styles from './ImageUpload.module.css'

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
  buttonText?: string
  className?: string
}

export default function ImageUpload({ 
  onImageUploaded, 
  buttonText = 'Загрузить изображение',
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setUploading(true)

    try {
      const result = await uploadImage(file)

      if ('error' in result) {
        setError(result.error)
        setUploading(false)
        return
      }

      onImageUploaded(result.url)
      setUploading(false)

      // Очистка input для возможности загрузить тот же файл снова
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setError('Произошла ошибка при загрузке')
      setUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className={styles.fileInput}
        disabled={uploading}
      />
      
      <button
        type="button"
        onClick={handleButtonClick}
        className={styles.uploadButton}
        disabled={uploading}
      >
        {uploading ? (
          <>
            <FaSpinner className={styles.spinner} /> Загрузка...
          </>
        ) : (
          <>
            <FaImage /> {buttonText}
          </>
        )}
      </button>

      {error && (
        <div className={styles.error}>
          <span>{error}</span>
          <button
            type="button"
            onClick={clearError}
            className={styles.closeError}
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  )
}

