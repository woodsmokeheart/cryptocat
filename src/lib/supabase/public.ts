import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from '@/lib/env'

// Публичный клиент Supabase для неаутентифицированных запросов
export function createPublicClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

  return createClient(supabaseUrl, supabaseAnonKey)
}
