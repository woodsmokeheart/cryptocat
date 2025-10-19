import { createClient } from '@/lib/supabase/server'

/**
 * Проверяет, есть ли хотя бы один опубликованный пост
 */
export async function hasPublishedPosts(): Promise<boolean> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('id')
    .eq('published', true)
    .limit(1)

  if (error) {
    console.error('Error checking published posts:', error)
    return false
  }

  return data && data.length > 0
}

/**
 * Получает количество опубликованных постов
 */
export async function getPublishedPostsCount(): Promise<number> {
  const supabase = await createClient()
  
  const { count, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)

  if (error) {
    console.error('Error getting published posts count:', error)
    return 0
  }

  return count || 0
}
