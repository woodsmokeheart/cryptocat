export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  published: boolean
  cover_image?: string | null
  created_at: string
  updated_at: string
  author_id: string
}

export interface CreatePostInput {
  title: string
  content: string
  excerpt: string
  published: boolean
  cover_image?: string | null
}

export interface UpdatePostInput {
  title?: string
  content?: string
  excerpt?: string
  published?: boolean
  cover_image?: string | null
}

export interface PostsResponse {
  posts: Post[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

