import { ReactNode } from 'react'

export interface SlideContent {
  id: string | number
  title: string
  content: ReactNode
  slideClassName?: string
}

export interface ModalSlideData {
  title: string
  description: string
  slides: SlideContent[]
}
