'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export const useModal = (modalName: string) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const modalParam = searchParams.get('modal')
    setIsOpen(modalParam === modalName)
  }, [searchParams, modalName])

  const openModal = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('modal', modalName)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('modal')
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.push(newUrl, { scroll: false })
  }

  return {
    isOpen,
    openModal,
    closeModal
  }
}
