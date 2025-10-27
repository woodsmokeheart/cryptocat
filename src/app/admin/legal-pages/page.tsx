import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LegalPagesList from '@/components/LegalPagesList/LegalPagesList'

export default async function AdminLegalPagesPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Проверка, что пользователь админ
  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  return <LegalPagesList />
}

