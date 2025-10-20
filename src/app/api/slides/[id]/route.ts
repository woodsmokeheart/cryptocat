import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { UpdateSlideInput } from '@/types/slide'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    
    const { data: slide, error } = await supabase
      .from('slides')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching slide:', error)
      return NextResponse.json({ error: 'Failed to fetch slide' }, { status: 500 })
    }

    return NextResponse.json({ slide })
  } catch (error) {
    console.error('Error in GET /api/slides/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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

    const body: UpdateSlideInput = await request.json()
    const { id, ...updateData } = body

    const { data: slide, error } = await supabase
      .from('slides')
      .update(updateData)
      .eq('id', params.id)
      .eq('author_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating slide:', error)
      return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 })
    }

    return NextResponse.json({ slide })
  } catch (error) {
    console.error('Error in PUT /api/slides/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

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

    const { error } = await supabase
      .from('slides')
      .delete()
      .eq('id', params.id)
      .eq('author_id', user.id)

    if (error) {
      console.error('Error deleting slide:', error)
      return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/slides/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
