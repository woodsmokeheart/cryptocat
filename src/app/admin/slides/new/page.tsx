import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SlideForm from '@/components/SlideForm/SlideForm'

export default async function NewSlidePage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  return <SlideForm />
}
