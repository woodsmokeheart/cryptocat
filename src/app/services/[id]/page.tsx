import { notFound } from 'next/navigation'
import { createPublicClient } from '@/lib/supabase/public'
import { Service } from '@/types/service'
import ServiceDetail from '@/components/ServiceDetail/ServiceDetail'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getService(id: string): Promise<Service | null> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function ServicePage({ params }: PageProps) {
  const { id } = await params
  const service = await getService(id)

  if (!service) {
    notFound()
  }

  return <ServiceDetail service={service} />
}

