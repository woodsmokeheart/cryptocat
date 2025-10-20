export interface Slide {
  id: string
  heading: string
  title: string
  title_accent: string
  description: string
  description_accent: string
  link_url?: string
  link_text?: string
  background_image: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
  author_id: string
}

export interface CreateSlideInput {
  heading: string
  title: string
  title_accent: string
  description: string
  description_accent: string
  link_url?: string
  link_text?: string
  background_image: string
  order_index?: number
  is_active?: boolean
}

export interface UpdateSlideInput extends Partial<CreateSlideInput> {
  id: string
}
