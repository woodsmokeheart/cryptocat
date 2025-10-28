import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { UpdateFaqItemData } from '@/types/faq'

export const dynamic = 'force-dynamic'

// GET - получить конкретный FAQ по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { id } = params

    const { data, error } = await supabase
      .from('faq_items')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 })
      }
      console.error('Error fetching FAQ item:', error)
      return NextResponse.json({ error: 'Failed to fetch FAQ item' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/faq/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - обновить FAQ (только для админа)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    
    // Проверяем аутентификацию
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Проверяем права админа
    if (user.email !== 'cryptocatagency2@gmail.com') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = params
    const body: UpdateFaqItemData = await request.json()

    // Если обновляется slug, проверяем его уникальность
    if (body.slug) {
      const { data: existingFaq } = await supabase
        .from('faq_items')
        .select('id')
        .eq('slug', body.slug)
        .neq('id', id)
        .single()

      if (existingFaq) {
        return NextResponse.json({ 
          error: 'FAQ item with this slug already exists' 
        }, { status: 400 })
      }
    }

    const { data, error } = await supabase
      .from('faq_items')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'FAQ item not found' }, { status: 404 })
      }
      console.error('Error updating FAQ item:', error)
      return NextResponse.json({ error: 'Failed to update FAQ item' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/faq/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - удалить FAQ (только для админа)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    
    // Проверяем аутентификацию
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Проверяем права админа
    if (user.email !== 'cryptocatagency2@gmail.com') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = params

    const { error } = await supabase
      .from('faq_items')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting FAQ item:', error)
      return NextResponse.json({ error: 'Failed to delete FAQ item' }, { status: 500 })
    }

    return NextResponse.json({ message: 'FAQ item deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/faq/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
