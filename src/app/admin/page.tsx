import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Проверка, что пользователь админ
  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  // Получаем количество постов
  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  return <AdminDashboard user={user} postsCount={postsCount || 0} />
}

