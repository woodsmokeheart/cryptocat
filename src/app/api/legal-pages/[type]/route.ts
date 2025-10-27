import { NextResponse } from 'next/server'
import { getLegalPage, updateLegalPage, deleteLegalPage } from '@/lib/legal-pages'
import type { UpdateLegalPageInput, PageType } from '@/types/legal-page'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    const pageType = params.type as PageType
    
    if (pageType !== 'privacy_policy' && pageType !== 'terms_of_use') {
      return NextResponse.json(
        { error: 'Invalid page type' },
        { status: 400 }
      )
    }

    const page = await getLegalPage(pageType)
    
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching legal page:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    // Проверка авторизации
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const pageType = params.type as PageType
    
    if (pageType !== 'privacy_policy' && pageType !== 'terms_of_use') {
      return NextResponse.json(
        { error: 'Invalid page type' },
        { status: 400 }
      )
    }

    const body = await request.json() as UpdateLegalPageInput
    
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'At least one field must be provided' },
        { status: 400 }
      )
    }

    const page = await updateLegalPage(pageType, body)
    return NextResponse.json(page)
  } catch (error) {
    console.error('Error updating legal page:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { type: string } }
) {
  try {
    // Проверка авторизации
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const pageType = params.type as PageType
    
    if (pageType !== 'privacy_policy' && pageType !== 'terms_of_use') {
      return NextResponse.json(
        { error: 'Invalid page type' },
        { status: 400 }
      )
    }

    await deleteLegalPage(pageType)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting legal page:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
