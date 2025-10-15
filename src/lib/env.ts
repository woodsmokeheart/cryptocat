export type SupabaseConfig = {
  supabaseUrl: string
  supabaseAnonKey: string
  adminEmail: string
}

export function getSupabaseConfig(): SupabaseConfig {
  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
  const rawKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()
  const rawAdminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').trim()

  // Validate URL to avoid "Invalid supabaseUrl" runtime errors
  try {
    // Throws if invalid
    // eslint-disable-next-line no-new
    new URL(rawUrl)
  } catch (_) {
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL. It must be a valid http/https URL.')
  }

  if (!rawKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable.')
  }

  if (!rawAdminEmail) {
    throw new Error('Missing NEXT_PUBLIC_ADMIN_EMAIL environment variable.')
  }

  return {
    supabaseUrl: rawUrl,
    supabaseAnonKey: rawKey,
    adminEmail: rawAdminEmail,
  }
}


