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

  // Получаем количество слайдов
  const { count: slidesCount } = await supabase
    .from('slides')
    .select('*', { count: 'exact', head: true })

  // Получаем количество FAQ
  const { count: faqCount } = await supabase
    .from('faq_items')
    .select('*', { count: 'exact', head: true })

  // Получаем количество услуг
  const { count: servicesCount } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })

  return <AdminDashboard 
    user={user} 
    postsCount={postsCount || 0} 
    slidesCount={slidesCount || 0} 
    faqCount={faqCount || 0}
    servicesCount={servicesCount || 0}
  />
}

