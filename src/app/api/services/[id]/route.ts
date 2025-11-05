import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { UpdateServiceData } from '@/types/service'

export const dynamic = 'force-dynamic'

// GET - получить конкретную услугу по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { id } = params

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 })
      }
      console.error('Error fetching service:', error)
      return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 })
    }

    // Нормализуем данные: убеждаемся, что mobile_accordion_button_text всегда имеет значение
    const normalizedData = {
      ...data,
      mobile_accordion_button_text: (data.mobile_accordion_button_text && data.mobile_accordion_button_text.trim()) || 'Развернуть'
    }

    return NextResponse.json(normalizedData)
  } catch (error) {
    console.error('Error in GET /api/services/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - обновить услугу (только для админа)
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
    const body: UpdateServiceData = await request.json()

    // Подготавливаем данные для обновления
    // Создаем объект для Supabase, который может содержать null
    const updateData: Record<string, unknown> = { ...body }
    
    // Обрабатываем detail_page_url: теперь это обязательное поле
    if ('detail_page_url' in body) {
      const urlValue = body.detail_page_url
      if (urlValue && typeof urlValue === 'string') {
        const trimmedUrl = urlValue.trim()
        if (trimmedUrl.length === 0) {
          return NextResponse.json({ 
            error: 'detail_page_url cannot be empty' 
          }, { status: 400 })
        }
        updateData.detail_page_url = trimmedUrl
      } else if (urlValue === null || urlValue === '') {
        return NextResponse.json({ 
          error: 'detail_page_url is required' 
        }, { status: 400 })
      }
    }
    
    // Убеждаемся, что mobile_accordion_button_text всегда имеет значение, если оно передается
    if ('mobile_accordion_button_text' in body) {
      updateData.mobile_accordion_button_text = (body.mobile_accordion_button_text?.trim() || 'Развернуть')
    }

    const { data, error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 })
      }
      console.error('Error updating service:', error)
      return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
    }

    // Нормализуем данные: убеждаемся, что mobile_accordion_button_text всегда имеет значение
    const normalizedData = {
      ...data,
      mobile_accordion_button_text: (data.mobile_accordion_button_text && data.mobile_accordion_button_text.trim()) || 'Развернуть'
    }

    return NextResponse.json(normalizedData)
  } catch (error) {
    console.error('Error in PUT /api/services/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - удалить услугу (только для админа)
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
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting service:', error)
      return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Service deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/services/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

