'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaStrikethrough,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaUndo,
  FaRedo,
  FaArrowLeft
} from 'react-icons/fa'
import Link from 'next/link'
import styles from './LegalPageForm.module.css'
import type { LegalPage, PageType } from '@/types/legal-page'

interface LegalPageFormProps {
  pageType: PageType
  initialData?: LegalPage | null
}

export default function LegalPageForm({ pageType, initialData }: LegalPageFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Начните писать...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: initialData?.content || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  })

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title)
      if (editor) {
        editor.commands.setContent(initialData.content)
      }
    }
  }, [initialData, editor])

  const getPageTitle = () => {
    return pageType === 'privacy_policy' ? 'Privacy Policy' : 'Terms of Use'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!title.trim()) {
      setError('Заголовок обязателен')
      return
    }

    if (!editor) {
      setError('Редактор не инициализирован')
      return
    }

    const content = editor.getHTML()
    if (!content || content === '<p></p>') {
      setError('Контент обязателен')
      return
    }

    setIsSubmitting(true)

    try {
      // Для существующей страницы используем PUT, для новой - POST
      const url = initialData 
        ? `/api/legal-pages/${pageType}`
        : '/api/legal-pages'
      
      const method = initialData ? 'PUT' : 'POST'
      
      const body: { title: string; content: string; page_type?: string } = {
        title,
        content,
      }
      
      // При создании добавляем page_type
      if (!initialData) {
        body.page_type = pageType
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save page')
      }

      router.push('/admin/legal-pages')
    } catch (err) {
      console.error('Error saving legal page:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!initialData) return
    
    if (!confirm(`Вы уверены, что хотите удалить ${getPageTitle()}?`)) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/legal-pages/${pageType}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete page')
      }

      router.push('/admin/legal-pages')
    } catch (err) {
      console.error('Error deleting legal page:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!editor) {
    return <div>Загрузка редактора...</div>
  }

  return (
    <div className={styles.formContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/admin/legal-pages" className={styles.backLink}>
            <FaArrowLeft /> Назад
          </Link>
          <h1>{initialData ? 'Редактировать' : 'Создать'} {getPageTitle()}</h1>
        </div>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>
            Заголовок *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            placeholder="Введите заголовок"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Содержание *</label>
          <div className={styles.editor}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? styles.active : ''}
                  title="Жирный (Ctrl+B)"
                >
                  <FaBold />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? styles.active : ''}
                  title="Курсив (Ctrl+I)"
                >
                  <FaItalic />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={editor.isActive('underline') ? styles.active : ''}
                  title="Подчёркнутый (Ctrl+U)"
                >
                  <FaUnderline />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? styles.active : ''}
                  title="Зачёркнутый"
                >
                  <FaStrikethrough />
                </button>
              </div>

              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}
                  title="Заголовок 1"
                >
                  <FaHeading />
                  <span>1</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}
                  title="Заголовок 2"
                >
                  <FaHeading />
                  <span>2</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}
                  title="Заголовок 3"
                >
                  <FaHeading />
                  <span>3</span>
                </button>
              </div>

              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive('bulletList') ? styles.active : ''}
                  title="Маркированный список"
                >
                  <FaListUl />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive('orderedList') ? styles.active : ''}
                  title="Нумерованный список"
                >
                  <FaListOl />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={editor.isActive('blockquote') ? styles.active : ''}
                  title="Цитата"
                >
                  <FaQuoteLeft />
                </button>
              </div>

              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  className={editor.isActive({ textAlign: 'left' }) ? styles.active : ''}
                  title="По левому краю"
                >
                  <FaAlignLeft />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  className={editor.isActive({ textAlign: 'center' }) ? styles.active : ''}
                  title="По центру"
                >
                  <FaAlignCenter />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  className={editor.isActive({ textAlign: 'right' }) ? styles.active : ''}
                  title="По правому краю"
                >
                  <FaAlignRight />
                </button>
              </div>

              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  title="Отменить (Ctrl+Z)"
                >
                  <FaUndo />
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  title="Повторить (Ctrl+Shift+Z)"
                >
                  <FaRedo />
                </button>
              </div>
            </div>

            <EditorContent editor={editor} />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Сохранение...' : initialData ? 'Сохранить' : 'Создать'}
          </button>
          
          {initialData && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isSubmitting}
              className={styles.deleteButton}
            >
              Удалить
            </button>
          )}
        </div>
      </form>
      </main>
    </div>
  )
}

