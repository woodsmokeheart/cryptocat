import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AboutManager from '@/components/AboutManager/AboutManager'

export default async function AdminAboutPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'cryptocatagency2@gmail.com')) {
    redirect('/admin/login')
  }

  return <AboutManager />
}

