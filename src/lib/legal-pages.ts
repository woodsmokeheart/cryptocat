import { createClient } from '@/lib/supabase/server'
import type { LegalPage, CreateLegalPageInput, UpdateLegalPageInput } from '@/types/legal-page'

export async function getLegalPage(pageType: 'privacy_policy' | 'terms_of_use'): Promise<LegalPage | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('legal_pages')
    .select('*')
    .eq('page_type', pageType)
    .single()

  if (error) {
    console.error('Error fetching legal page:', error)
    return null
  }

  return data
}

export async function getAllLegalPages(): Promise<LegalPage[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('legal_pages')
    .select('*')
    .order('page_type', { ascending: true })

  if (error) {
    console.error('Error fetching legal pages:', error)
    return []
  }

  return data || []
}

export async function createLegalPage(input: CreateLegalPageInput): Promise<LegalPage> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('legal_pages')
    .insert(input)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateLegalPage(
  pageType: 'privacy_policy' | 'terms_of_use',
  input: UpdateLegalPageInput
): Promise<LegalPage> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('legal_pages')
    .update(input)
    .eq('page_type', pageType)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteLegalPage(pageType: 'privacy_policy' | 'terms_of_use'): Promise<void> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('legal_pages')
    .delete()
    .eq('page_type', pageType)

  if (error) {
    throw new Error(error.message)
  }
}

