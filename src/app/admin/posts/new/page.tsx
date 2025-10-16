import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PostForm from '@/components/PostForm/PostForm'

export default async function NewPostPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  return <PostForm mode="create" />
}

