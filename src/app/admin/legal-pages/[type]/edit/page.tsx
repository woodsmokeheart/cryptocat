import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getLegalPage } from '@/lib/legal-pages'
import LegalPageForm from '@/components/LegalPageForm/LegalPageForm'
import type { PageType } from '@/types/legal-page'

interface PageProps {
  params: {
    type: string
  }
}

export default async function EditLegalPagePage({ params }: PageProps) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Проверка, что пользователь админ
  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect('/admin/login')
  }

  const pageType = params.type as PageType
  
  if (pageType !== 'privacy_policy' && pageType !== 'terms_of_use') {
    redirect('/admin/legal-pages')
  }

  const page = await getLegalPage(pageType)

  return <LegalPageForm pageType={pageType} initialData={page} />
}

