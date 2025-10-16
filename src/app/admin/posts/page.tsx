import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPosts } from '@/lib/posts'
import PostsList from '@/components/PostsList/PostsList'

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const params = await searchParams
  const page = parseInt(params.page || '1', 10)
  const postsData = await getPosts(page, 9)

  return <PostsList postsData={postsData} />
}

