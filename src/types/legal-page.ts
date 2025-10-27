export type PageType = 'privacy_policy' | 'terms_of_use'

export interface LegalPage {
  id: string
  page_type: PageType
  title: string
  content: string
  created_at: string
  updated_at: string
}

export interface CreateLegalPageInput {
  page_type: PageType
  title: string
  content: string
}

export interface UpdateLegalPageInput {
  title?: string
  content?: string
}

