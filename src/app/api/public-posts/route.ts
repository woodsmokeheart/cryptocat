import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { PostsResponse } from '@/types/post'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '9', 10)

    const supabase = await createClient()
    
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
      throw new Error(`Failed to fetch posts: ${error.message}`)
    }

    const total = count || 0
    const totalPages = Math.ceil(total / pageSize)

    const response: PostsResponse = {
      posts: posts || [],
      total,
      page,
      pageSize,
      totalPages,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching public posts:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
