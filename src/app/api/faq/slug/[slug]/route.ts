import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// GET - получить FAQ по slug (для публичных страниц)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = await createClient()
    const { slug } = params

    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 })
      }
      console.error('Error fetching FAQ item by slug:', error)
      return NextResponse.json({ error: 'Failed to fetch FAQ item' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/faq/slug/[slug]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
