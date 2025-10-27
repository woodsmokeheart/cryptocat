import { NextResponse } from 'next/server'
import { getAllLegalPages, createLegalPage } from '@/lib/legal-pages'
import type { CreateLegalPageInput } from '@/types/legal-page'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const pages = await getAllLegalPages()
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching legal pages:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
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

    const body = await request.json() as CreateLegalPageInput

    if (!body.page_type || !body.title) {
      return NextResponse.json(
        { error: 'page_type and title are required' },
        { status: 400 }
      )
    }

    const page = await createLegalPage(body)
    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Error creating legal page:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
