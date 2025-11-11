'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  AboutDescription,
  AboutDescriptionPayload,
  TeamMember,
  CreateTeamMemberData,
} from '@/types/about'
import { FaEdit, FaTrash, FaImage } from 'react-icons/fa'
import ImageUpload from '@/components/ImageUpload/ImageUpload'
import AdminBackLink from '../AdminBackLink/AdminBackLink'
import styles from './AboutManager.module.css'

interface DescriptionFormState {
  title: string
  description: string
}

interface TeamFormState {
  id?: string
  name: string
  role: string
  image_url: string
  display_order: number
}

const defaultTeamFormState: TeamFormState = {
  name: '',
  role: '',
  image_url: '',
  display_order: 0,
}

const AboutManager: React.FC = () => {
  const [description, setDescription] = useState<AboutDescription | null>(null)
  const [descriptionForm, setDescriptionForm] = useState<DescriptionFormState>({
    title: '',
    description: '',
  })
  const [descriptionLoading, setDescriptionLoading] = useState(false)

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [teamLoading, setTeamLoading] = useState(false)
  const [teamForm, setTeamForm] = useState<TeamFormState>(defaultTeamFormState)
  const [teamSubmitting, setTeamSubmitting] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchDescription()
    fetchTeamMembers()
  }, [])

  const fetchDescription = async () => {
    try {
      setDescriptionLoading(true)
      const response = await fetch('/api/about/description')

      if (!response.ok) {
        throw new Error('Failed to fetch description')
      }

      const data = await response.json()
      if (data) {
        setDescription(data)
        setDescriptionForm({
          title: data.title ?? '',
          description: data.description ?? '',
        })
      } else {
        setDescription(null)
        setDescriptionForm({ title: '', description: '' })
      }
    } catch (err) {
      console.error('Error fetching description:', err)
      setError('Не удалось загрузить описание компании')
    } finally {
      setDescriptionLoading(false)
    }
  }

  const fetchTeamMembers = async () => {
    try {
      setTeamLoading(true)
      const response = await fetch('/api/about/team')

      if (!response.ok) {
        throw new Error('Failed to fetch team members')
      }

      const data = await response.json()
      setTeamMembers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching team members:', err)
      setError('Не удалось загрузить участников команды')
    } finally {
      setTeamLoading(false)
    }
  }

  const handleDescriptionChange = (field: keyof DescriptionFormState, value: string) => {
    setDescriptionForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetMessages = () => {
    setError(null)
    setSuccessMessage(null)
  }

  const handleDescriptionSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    resetMessages()

    if (!descriptionForm.title.trim() || !descriptionForm.description.trim()) {
      setError('Заполните заголовок и описание')
      return
    }

    setDescriptionLoading(true)

    const payload: AboutDescriptionPayload = {
      title: descriptionForm.title.trim(),
      description: descriptionForm.description.trim(),
    }

    try {
      const method = description ? 'PUT' : 'POST'
      const response = await fetch('/api/about/description', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const { error: responseError } = await response.json()
        throw new Error(responseError || 'Failed to save description')
      }

      const data = await response.json()
      setDescription(data)
      setSuccessMessage('Описание успешно сохранено')
    } catch (err) {
      console.error('Error saving description:', err)
      setError('Не удалось сохранить описание. Попробуйте снова.')
    } finally {
      setDescriptionLoading(false)
    }
  }

  const handleTeamFormChange = (field: keyof TeamFormState, value: string) => {
    setTeamForm((prev) => ({
      ...prev,
      [field]:
        field === 'display_order'
          ? Number(value)
          : value,
    }))
  }

  const startEditMember = (member: TeamMember) => {
    resetMessages()
    setTeamForm({
      id: member.id,
      name: member.name,
      role: member.role,
      image_url: member.image_url,
      display_order: member.display_order ?? 0,
    })
  }

  const cancelTeamEdit = () => {
    setTeamForm(defaultTeamFormState)
  }

  const handleTeamSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    resetMessages()

    if (!teamForm.name.trim() || !teamForm.role.trim() || !teamForm.image_url.trim()) {
      setError('Пожалуйста, заполните имя, роль и ссылку на изображение')
      return
    }

    setTeamSubmitting(true)

    const payload: CreateTeamMemberData = {
      name: teamForm.name.trim(),
      role: teamForm.role.trim(),
      image_url: teamForm.image_url.trim(),
      display_order: Number.isFinite(teamForm.display_order)
        ? teamForm.display_order
        : 0,
    }

    const isEdit = Boolean(teamForm.id)
    const endpoint = isEdit ? `/api/about/team/${teamForm.id}` : '/api/about/team'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const { error: responseError } = await response.json()
        throw new Error(responseError || 'Failed to save team member')
      }

      await fetchTeamMembers()
      setTeamForm(defaultTeamFormState)
      setSuccessMessage(isEdit ? 'Карточка обновлена' : 'Карточка создана')
    } catch (err) {
      console.error('Error saving team member:', err)
      setError('Не удалось сохранить карточку участника')
    } finally {
      setTeamSubmitting(false)
    }
  }

  const handleDeleteMember = async (id: string) => {
    resetMessages()
    if (!confirm('Удалить этого участника?')) {
      return
    }

    try {
      const response = await fetch(`/api/about/team/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const { error: responseError } = await response.json()
        throw new Error(responseError || 'Failed to delete team member')
      }

      setTeamMembers((prev) => prev.filter((member) => member.id !== id))
      if (teamForm.id === id) {
        setTeamForm(defaultTeamFormState)
      }
      setSuccessMessage('Карточка удалена')
    } catch (err) {
      console.error('Error deleting team member:', err)
      setError('Не удалось удалить участника')
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <AdminBackLink href="/admin" className={styles.backLink} />
          <div className={styles.headerTitle}>
            <h1>О нас</h1>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        {(error || successMessage) && (
          <div className={styles.messages}>
            {error && <div className={styles.error}>{error}</div>}
            {successMessage && <div className={styles.success}>{successMessage}</div>}
          </div>
        )}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Описание компании</h2>
            {descriptionLoading && <span className={styles.badge}>Сохранение...</span>}
          </div>

          <form className={styles.descriptionForm} onSubmit={handleDescriptionSubmit}>
            <label className={styles.label}>
              Заголовок
              <input
                type="text"
                value={descriptionForm.title}
                onChange={(e) => handleDescriptionChange('title', e.target.value)}
                placeholder="Например, «Мы создаем криптомагию»"
                className={styles.input}
                disabled={descriptionLoading}
                required
              />
            </label>

            <label className={styles.label}>
              Описание
              <textarea
                value={descriptionForm.description}
                onChange={(e) => handleDescriptionChange('description', e.target.value)}
                placeholder="Расскажите о миссии, ценностях и уникальности команды"
                className={styles.textarea}
                rows={6}
                disabled={descriptionLoading}
                required
              />
            </label>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={descriptionLoading}
              >
                {description ? 'Обновить описание' : 'Создать описание'}
              </button>
            </div>
          </form>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Команда</h2>
            {teamLoading && <span className={styles.badge}>Загрузка...</span>}
          </div>

          <form className={styles.teamForm} onSubmit={handleTeamSubmit}>
            <div className={styles.formRow}>
              <label className={styles.label}>
                Имя
                <input
                  type="text"
                  value={teamForm.name}
                  onChange={(e) => handleTeamFormChange('name', e.target.value)}
                  placeholder="Имя участника"
                  className={styles.input}
                  disabled={teamSubmitting}
                  required
                />
              </label>
              <label className={styles.label}>
                Роль
                <input
                  type="text"
                  value={teamForm.role}
                  onChange={(e) => handleTeamFormChange('role', e.target.value)}
                  placeholder="Например, блокчейн-инженер"
                  className={styles.input}
                  disabled={teamSubmitting}
                  required
                />
              </label>
            </div>

            <label className={styles.label}>
              <span className={styles.labelTitle}>
                <FaImage /> Изображение участника
              </span>
              <p className={styles.hint}>
                Загрузите портрет участника (JPEG, PNG, WebP или GIF, до 5 MB). Изображение появится в превью.
              </p>
              <ImageUpload
                onImageUploaded={(url) => setTeamForm((prev) => ({ ...prev, image_url: url }))}
                buttonText={teamForm.image_url ? 'Заменить изображение' : 'Загрузить изображение'}
              />
            {teamForm.image_url && (
              <div className={styles.imagePreview}>
                <Image
                  src={teamForm.image_url}
                  alt={teamForm.name || 'Предпросмотр'}
                  width={640}
                  height={360}
                  className={styles.imagePreviewImg}
                />
                <button
                  type="button"
                  className={styles.removeImageButton}
                  onClick={() => setTeamForm((prev) => ({ ...prev, image_url: '' }))}
                  disabled={teamSubmitting}
                >
                  Удалить изображение
                </button>
              </div>
            )}
            </label>

            <label className={styles.label}>
              Порядок отображения
              <input
                type="number"
                value={teamForm.display_order}
                onChange={(e) => handleTeamFormChange('display_order', e.target.value)}
                className={styles.input}
                disabled={teamSubmitting}
              />
            </label>

            <div className={styles.actions}>
              {teamForm.id && (
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={cancelTeamEdit}
                  disabled={teamSubmitting}
                >
                  Отмена
                </button>
              )}
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={teamSubmitting}
              >
                {teamForm.id ? 'Обновить участника' : 'Добавить участника'}
              </button>
            </div>
          </form>

          <div className={styles.teamListHeader}>
            <h3>Карточки команды</h3>
          </div>

          {teamMembers.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Карточки команды пока не созданы. Добавьте первую, солнышко!</p>
            </div>
          ) : (
            <div className={styles.teamGrid}>
              {teamMembers.map((member) => (
                <div key={member.id} className={styles.teamCard}>
                  <div className={styles.teamImageWrapper}>
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          fill
                          className={styles.teamImage}
                          sizes="(max-width: 600px) 100vw, 320px"
                        />
                  </div>
                  <div className={styles.teamCardBody}>
                    <div className={styles.teamCardHeader}>
                      <h4>{member.name}</h4>
                      <span className={styles.badgeMuted}>#{member.display_order ?? 0}</span>
                    </div>
                    <p className={styles.teamRole}>{member.role}</p>
                    <div className={styles.cardActions}>
                      <button
                        type="button"
                        className={styles.iconButton}
                        onClick={() => startEditMember(member)}
                      >
                        <FaEdit />
                        Редактировать
                      </button>
                      <button
                        type="button"
                        className={`${styles.iconButton} ${styles.deleteButton}`}
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <FaTrash />
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default AboutManager

