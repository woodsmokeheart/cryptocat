import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SlidesList from '@/components/SlidesList/SlidesList'

export default async function SlidesPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  return <SlidesList />
}
