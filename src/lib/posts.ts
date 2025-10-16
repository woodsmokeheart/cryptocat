import { createClient } from '@/lib/supabase/server'
import type { Post, CreatePostInput, UpdatePostInput, PostsResponse } from '@/types/post'

export async function getPosts(page = 1, pageSize = 10): Promise<PostsResponse> {
  const supabase = await createClient()
  
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data: posts, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
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

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...input,
      author_id: user.id,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create post: ${error.message}`)
  }

  return data
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<Post> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update post: ${error.message}`)
  }

  return data
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete post: ${error.message}`)
  }
}

