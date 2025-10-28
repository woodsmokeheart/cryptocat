'use client'

import React from 'react'
import FaqForm from '@/components/FaqForm/FaqForm'

interface EditFaqPageProps {
  params: {
    id: string
  }
}

const EditFaqPage: React.FC<EditFaqPageProps> = ({ params }) => {
  return <FaqForm faqId={params.id} />
}

export default EditFaqPage
