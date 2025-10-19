import { NextResponse } from 'next/server'
import { createPost } from '@/lib/posts'
import { revalidatePath } from 'next/cache'
import type { CreatePostInput } from '@/types/post'

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreatePostInput

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const post = await createPost(body)
    
    // Обновляем кэш ленты если пост опубликован
    if (post.published) {
      revalidatePath('/lenta')
    }
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

