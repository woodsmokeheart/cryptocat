import { ReactNode } from 'react'

export interface SlideContent {
  id: string | number
  content: ReactNode
}

export interface ModalSlideData {
  title: string
  description: string
  slides: SlideContent[]
}
