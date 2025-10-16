import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getPostById } from '@/lib/posts'
import PostView from '@/components/PostView/PostView'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PageProps) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <PostView post={post} />
}

