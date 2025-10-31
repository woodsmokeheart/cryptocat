import { Suspense } from 'react'
import PublicPostsList from '@/components/PublicPostsList/PublicPostsList'
import Loader from '@/components/Loader/Loader'
import { createPublicClient } from '@/lib/supabase/public'
import type { PostsResponse } from '@/types/post'

// Делаем страницу динамической - всегда свежие данные
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

async function getPublicPosts(page: number): Promise<PostsResponse> {
  const supabase = createPublicClient()
  
  const pageSize = 9
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  // Получаем только опубликованные посты
  const { data: posts, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('published', true) // Только опубликованные
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching public posts:', error)
    throw new Error(`Failed to fetch posts: ${error.message}`)
  }

  const total = count || 0
  const totalPages = Math.ceil(total / pageSize)

  return {
    posts: posts || [],
    total,
    page,
    pageSize,
    totalPages,
  }
}

export default async function LentaPage({ searchParams }: PageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  
  let postsData: PostsResponse
  
  try {
    postsData = await getPublicPosts(page)
  } catch (error) {
    console.error('Error in LentaPage:', error)
    // Если ошибка, показываем пустую страницу
    postsData = {
      posts: [],
      total: 0,
      page: 1,
      pageSize: 9,
      totalPages: 0,
    }
  }

  return (
    <div className="lenta-page">
      <Suspense fallback={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          width: '100%'
        }}>
          <Loader size="large" />
        </div>
      }>
        <PublicPostsList postsData={postsData} />
      </Suspense>
    </div>
  )
}
