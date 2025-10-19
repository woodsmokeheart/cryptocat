import { createClient } from '@/lib/supabase/client'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB в байтах

export interface UploadImageResult {
  url: string
  path: string
}

export interface UploadImageError {
  error: string
}

/**
 * Валидация размера изображения
 */
export function validateImageSize(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
    return {
      valid: false,
      error: `Размер файла (${sizeMB} MB) превышает максимально допустимый размер 5 MB`,
    }
  }
  return { valid: true }
}

/**
 * Валидация типа изображения
 */
export function validateImageType(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Допустимые форматы: JPEG, PNG, WebP, GIF',
    }
  }
  return { valid: true }
}

/**
 * Загрузка изображения в Supabase Storage
 */
export async function uploadImage(
  file: File,
  folder = 'posts'
): Promise<UploadImageResult | UploadImageError> {
  // Валидация размера
  const sizeValidation = validateImageSize(file)
  if (!sizeValidation.valid) {
    return { error: sizeValidation.error! }
  }

  // Валидация типа
  const typeValidation = validateImageType(file)
  if (!typeValidation.valid) {
    return { error: typeValidation.error! }
  }

  const supabase = createClient()

  // Генерация уникального имени файла
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

  try {
    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return { error: 'Ошибка при загрузке изображения' }
    }

    // Получение публичного URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('post-images').getPublicUrl(data.path)

    return {
      url: publicUrl,
      path: data.path,
    }
  } catch (err) {
    console.error('Upload exception:', err)
    return { error: 'Произошла ошибка при загрузке' }
  }
}

/**
 * Удаление изображения из Supabase Storage
 */
export async function deleteImage(path: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  try {
    const { error } = await supabase.storage.from('post-images').remove([path])

    if (error) {
      console.error('Delete error:', error)
      return { success: false, error: 'Ошибка при удалении изображения' }
    }

    return { success: true }
  } catch (err) {
    console.error('Delete exception:', err)
    return { success: false, error: 'Произошла ошибка при удалении' }
  }
}

/**
 * Извлечение всех URL изображений из HTML контента
 */
export function extractImagesFromContent(htmlContent: string): string[] {
  const imgRegex = /<img[^>]+src="([^">]+)"/g
  const images: string[] = []
  let match

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    images.push(match[1])
  }

  return images
}

/**
 * Получение имени файла из URL Supabase Storage
 */
export function getFileNameFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    const parts = pathname.split('/')
    return parts[parts.length - 1]
  } catch {
    return null
  }
}

