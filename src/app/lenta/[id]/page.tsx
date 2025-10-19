import { notFound } from 'next/navigation'
import { createPublicClient } from '@/lib/supabase/public'
import PublicPostView from '@/components/PublicPostView/PublicPostView'
import type { Post } from '@/types/post'

// Делаем страницу динамической - всегда свежие данные
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getPublicPost(id: string): Promise<Post | null> {
  const supabase = createPublicClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .eq('published', true) // Только опубликованные посты
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

export default async function PublicPostPage({ params }: PageProps) {
  const { id } = await params
  const post = await getPublicPost(id)

  if (!post) {
    notFound()
  }

  return <PublicPostView post={post} />
}
