import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { AboutDescriptionPayload } from '@/types/about'

export const dynamic = 'force-dynamic'

async function requireAdmin(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<{ user: { id: string; email?: string | null } } | { response: NextResponse }> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'cryptocatagency2@gmail.com'

  if (user.email !== adminEmail) {
    return { response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  return { user }
}

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('about_description')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Error fetching about description:', error)
      return NextResponse.json({ error: 'Failed to fetch about description' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/about/description:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const adminResult = await requireAdmin(supabase)
    if ('response' in adminResult) {
      return adminResult.response
    }

    const { user: adminUser } = adminResult
    const body: AboutDescriptionPayload = await request.json()

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description' },
        { status: 400 }
      )
    }

    const { data: existing } = await supabase
      .from('about_description')
      .select('id')
      .limit(1)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'Description already exists. Use PUT to update.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('about_description')
      .insert({
        title: body.title,
        description: body.description,
        created_by: adminUser.id,
        updated_by: adminUser.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating about description:', error)
      return NextResponse.json({ error: 'Failed to create about description' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/about/description:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()

    const adminResult = await requireAdmin(supabase)
    if ('response' in adminResult) {
      return adminResult.response
    }

    const { user: adminUser } = adminResult
    const body: AboutDescriptionPayload = await request.json()

    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description' },
        { status: 400 }
      )
    }

    const { data: existing, error: existingError } = await supabase
      .from('about_description')
      .select('id')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (existingError) {
      console.error('Error fetching existing about description:', existingError)
      return NextResponse.json({ error: 'Failed to fetch about description' }, { status: 500 })
    }

    if (!existing) {
      return NextResponse.json({ error: 'Description not found' }, { status: 404 })
    }

    const { data, error } = await supabase
      .from('about_description')
      .update({
        title: body.title,
        description: body.description,
        updated_by: adminUser.id,
      })
      .eq('id', existing.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating about description:', error)
      return NextResponse.json({ error: 'Failed to update about description' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/about/description:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

