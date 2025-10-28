export interface FaqItem {
  id: string
  title: string
  slug: string
  description: string
  content: string // HTML контент из TipTap
  image_url?: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
  created_by?: string
}

export interface CreateFaqItemData {
  title: string
  slug: string
  description: string
  content: string
  image_url?: string
  display_order?: number
}

export interface UpdateFaqItemData extends Partial<CreateFaqItemData> {
  is_active?: boolean
}
