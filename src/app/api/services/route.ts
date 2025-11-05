import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CreateServiceData } from '@/types/service'

export const dynamic = 'force-dynamic'

// GET - получить все услуги (для публичного использования - только активные, для админа - все)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const url = new URL(request.url)
    const includeInactive = url.searchParams.get('include_inactive') === 'true'
    
    let query = supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    // Если не запрашиваем неактивные, показываем только активные
    if (!includeInactive) {
      query = query.eq('is_active', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching services:', error)
      return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
    }

    // Нормализуем данные: убеждаемся, что mobile_accordion_button_text всегда имеет значение
    const normalizedData = (data || []).map((service: { mobile_accordion_button_text?: string | null }) => ({
      ...service,
      mobile_accordion_button_text: (service.mobile_accordion_button_text && service.mobile_accordion_button_text.trim()) || 'Развернуть'
    }))

    return NextResponse.json(normalizedData)
  } catch (error) {
    console.error('Error in GET /api/services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - создать новую услугу (только для админа)
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

    const body: CreateServiceData = await request.json()
    
    // Валидация обязательных полей
    if (!body.title || !body.description || !body.image_url) {
      return NextResponse.json({ 
        error: 'Missing required fields: title, description, image_url' 
      }, { status: 400 })
    }

    // detail_page_url теперь обязательное поле
    const trimmedDetailUrl = body.detail_page_url?.trim()
    if (!trimmedDetailUrl || trimmedDetailUrl.length === 0) {
      return NextResponse.json({ 
        error: 'Missing required field: detail_page_url' 
      }, { status: 400 })
    }

    const insertData = {
      title: body.title,
      description: body.description,
      image_url: body.image_url,
      detail_page_url: trimmedDetailUrl,
      mobile_accordion_button_text: body.mobile_accordion_button_text || 'Развернуть',
      display_order: body.display_order || 0,
      created_by: user.id,
      is_active: true
    }

    const { data, error } = await supabase
      .from('services')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('Error creating service:', error)
      return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
    }

    // Нормализуем данные: убеждаемся, что mobile_accordion_button_text всегда имеет значение
    const normalizedData = {
      ...data,
      mobile_accordion_button_text: (data.mobile_accordion_button_text && data.mobile_accordion_button_text.trim()) || 'Развернуть'
    }

    return NextResponse.json(normalizedData, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

