'use client'

import React from 'react'
import ServiceForm from '@/components/ServiceForm/ServiceForm'

interface EditServicePageProps {
  params: {
    id: string
  }
}

const EditServicePage: React.FC<EditServicePageProps> = ({ params }) => {
  return <ServiceForm serviceId={params.id} />
}

export default EditServicePage

