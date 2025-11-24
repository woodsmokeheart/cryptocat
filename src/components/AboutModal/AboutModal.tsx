'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { FaTimes, FaStar } from 'react-icons/fa'
import Portal from '@/components/Portal/Portal'
import { AboutDescription, TeamMember } from '@/types/about'
import styles from './AboutModal.module.css'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error'

const fetchAboutData = async () => {
  const [descriptionRes, teamRes] = await Promise.all([
    fetch('/api/about/description'),
    fetch('/api/about/team'),
  ])

  if (!descriptionRes.ok) {
    const { error } = await descriptionRes.json()
    throw new Error(error || 'Failed to load description')
  }

  if (!teamRes.ok) {
    const { error } = await teamRes.json()
    throw new Error(error || 'Failed to load team')
  }

  const description: AboutDescription | null = await descriptionRes.json()
  const team: TeamMember[] = await teamRes.json()

  return { description, team }
}

const FADE_DURATION = 280

interface TeamMemberCardProps {
  member: TeamMember
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <div className={styles.teamCard}>
      <div className={styles.cardHalo} />
      <div className={styles.cardImageWrapper}>
        {imageLoading && !imageError && (
          <div className={styles.imageSkeleton}>
            <div className={styles.skeletonShimmer} />
          </div>
        )}
        {!imageError && (
          <img
            src={member.image_url}
            alt={member.name}
            className={imageLoading ? styles.imageLoading : styles.imageLoaded}
            loading="lazy"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false)
              setImageError(true)
            }}
          />
        )}
        {imageError && (
          <div className={styles.imageError}>
            <span>Изображение не загружено</span>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <h4>{member.name}</h4>
        <span>{member.role}</span>
      </div>
    </div>
  )
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [description, setDescription] = useState<AboutDescription | null>(null)
  const [team, setTeam] = useState<TeamMember[]>([])
  const [error, setError] = useState<string | null>(null)
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(isOpen)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => setIsVisible(true))
    } else {
      setIsVisible(false)
      timeoutId = setTimeout(() => {
        setShouldRender(false)
      }, FADE_DURATION)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setLoadingState('loading')
    setError(null)

    let isCancelled = false

    fetchAboutData()
      .then(({ description: desc, team: members }) => {
        if (isCancelled) return
        setDescription(desc)
        setTeam(Array.isArray(members) ? members : [])
        setLoadingState('success')
      })
      .catch((err) => {
        if (isCancelled) return
        console.error('Error loading about modal data:', err)
        setError('О, нет! Не удалось загрузить данные. Попробуй закрыть и открыть снова, дорогой.')
        setLoadingState('error')
      })

    return () => {
      isCancelled = true
    }
  }, [isOpen])

  useEffect(() => {
    if (!shouldRender) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [shouldRender, onClose])

  const descriptionParagraphs = useMemo(() => {
    if (!description?.description) return []
    return description.description
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  }, [description])

  if (!shouldRender) {
    return null
  }

  const overlayClassName = `${styles.overlay} ${isVisible ? styles.overlayVisible : ''}`.trim()
  const modalClassName = `${styles.modal} ${isVisible ? styles.modalVisible : ''}`.trim()

  return (
    <Portal>
      <div className={overlayClassName} onClick={onClose}>
        <div
          className={modalClassName}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.backgroundGlow} />
          <div className={styles.noiseLayer} />

          <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть модальное окно">
            <FaTimes />
          </button>

          <div className={styles.scrollArea}>
            <div className={styles.header}>
              <div className={styles.topSpacer} aria-hidden="true" />
              <h2 className={styles.title}>
                {description?.title || 'Наша магическая команда'}
              </h2>
              <p className={styles.subtitle}>
                Мы соединяем смелые идеи, технологии и эстетику, чтобы воплощать невозможное.
              </p>
            </div>

            <div className={styles.content}>
              <div className={styles.descriptionBlock}>
                <div className={styles.descriptionGlow} />
                <div className={styles.descriptionHeader}>
                  <FaStar className={styles.sparkIcon} />
                  <span>О компании</span>
                </div>

                {loadingState === 'loading' && (
                  <div className={styles.loading}>
                    Загружаем историю… подожди секунду, дорогой.
                  </div>
                )}

                {loadingState === 'error' && (
                  <div className={styles.error}>{error}</div>
                )}

                {loadingState === 'success' && (
                  <div className={styles.descriptionContent}>
                    {descriptionParagraphs.length > 0 ? (
                      descriptionParagraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))
                    ) : (
                      <p>
                        Дорогой, пока здесь нет текста. Загляни в админ-панель и создай волшебное описание.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.teamBlock}>
                <div className={styles.teamHeader}>
                  <h3>Команда мечты</h3>
                  <p>
                    Каждый из нас — искра, которая зажигает инновации. Мы экспериментируем, исследуем и доводим идеи до совершенства.
                  </p>
                </div>

                <div className={styles.teamGrid}>
                  {loadingState === 'loading' && (
                    <div className={styles.teamSkeletonGrid}>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className={styles.teamSkeletonCard} />
                      ))}
                    </div>
                  )}

                  {loadingState === 'success' && team.length === 0 && (
                    <div className={styles.emptyTeam}>
                      Пока команда скрывается за кулисами. Добавь карточки в админ-панели, солнышко.
                    </div>
                  )}

                  {loadingState === 'success' && team.length > 0 && (
                    team.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default AboutModal

