import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ServicesList from '@/components/ServicesList/ServicesList'

export default async function ServicesPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  return <ServicesList />
}

