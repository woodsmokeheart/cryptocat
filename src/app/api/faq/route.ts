import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CreateFaqItemData } from '@/types/faq'

export const dynamic = 'force-dynamic'

// GET - получить все FAQ (для публичного использования - только активные, для админа - все)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const url = new URL(request.url)
    const includeInactive = url.searchParams.get('include_inactive') === 'true'
    
    let query = supabase
      .from('faq_items')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    // Если не запрашиваем неактивные, показываем только активные
    if (!includeInactive) {
      query = query.eq('is_active', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching FAQ items:', error)
      return NextResponse.json({ error: 'Failed to fetch FAQ items' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in GET /api/faq:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - создать новый FAQ (только для админа)
export async function POST(request: NextRequest) {
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

    const body: CreateFaqItemData = await request.json()
    
    // Валидация обязательных полей
    if (!body.title || !body.slug || !body.description || !body.content) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, slug, description, content' 
      }, { status: 400 })
    }

    // Проверяем уникальность slug
    const { data: existingFaq } = await supabase
      .from('faq_items')
      .select('id')
      .eq('slug', body.slug)
      .single()

    if (existingFaq) {
      return NextResponse.json({ 
        error: 'FAQ item with this slug already exists' 
      }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('faq_items')
      .insert({
        title: body.title,
        slug: body.slug,
        description: body.description,
        content: body.content,
        image_url: body.image_url,
        display_order: body.display_order || 0,
        created_by: user.id,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating FAQ item:', error)
      return NextResponse.json({ error: 'Failed to create FAQ item' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/faq:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
