'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEffect, useState } from 'react'
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
  FaImage
} from 'react-icons/fa'
import ImageUpload from '@/components/ImageUpload/ImageUpload'
import { uploadImage } from '@/lib/images'
import styles from './TipTapEditor.module.css'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function TipTapEditor({ content, onChange, placeholder = 'Начните писать...' }: TipTapEditorProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handlePasteImage = async (event: ClipboardEvent, editorInstance: typeof editor) => {
    const items = event.clipboardData?.items
    if (!items || !editorInstance) return false

    for (const item of Array.from(items)) {
      if (item.type.indexOf('image') === 0) {
        event.preventDefault()
        
        const file = item.getAsFile()
        if (!file) continue

        setIsUploading(true)

        // Загружаем изображение
        const result = await uploadImage(file)
        
        setIsUploading(false)

        if ('error' in result) {
          alert(result.error)
          return true
        }

        // Вставляем изображение в редактор
        editorInstance.chain().focus().setImage({ src: result.url }).run()
        
        return true
      }
    }

    return false
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  // Обработка вставки изображений из буфера обмена
  useEffect(() => {
    if (!editor) return

    const handlePaste = async (event: Event) => {
      if (event instanceof ClipboardEvent) {
        await handlePasteImage(event, editor)
      }
    }

    const editorElement = editor.view.dom
    editorElement.addEventListener('paste', handlePaste)

    return () => {
      editorElement.removeEventListener('paste', handlePaste)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  const handleImageUpload = (url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  if (!editor) {
    return null
  }


  return (
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
          <div className={styles.imageUploadWrapper}>
            <ImageUpload 
              onImageUploaded={handleImageUpload}
              buttonText="Изображение"
            />
          </div>
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
      
      {isUploading && (
        <div className={styles.uploadingIndicator}>
          Загрузка изображения из буфера обмена...
        </div>
      )}
    </div>
  )
}

