import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CreateSlideInput } from '@/types/slide'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: slides, error } = await supabase
      .from('slides')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching slides:', error)
      return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 })
    }

    return NextResponse.json({ slides })
  } catch (error) {
    console.error('Error in GET /api/slides:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Проверяем аутентификацию
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: CreateSlideInput = await request.json()
    
    const { data: slide, error } = await supabase
      .from('slides')
      .insert({
        ...body,
        author_id: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating slide:', error)
      return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 })
    }

    return NextResponse.json({ slide }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/slides:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
