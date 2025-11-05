export interface Service {
  id: string
  title: string
  description: string
  image_url: string
  detail_page_url: string
  mobile_accordion_button_text: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  created_by: string
}

export interface CreateServiceData {
  title: string
  description: string
  image_url: string
  detail_page_url: string
  mobile_accordion_button_text?: string
  display_order?: number
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  is_active?: boolean
}

