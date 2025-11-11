import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CreateTeamMemberData } from '@/types/about'

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
      .from('about_team_members')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error in GET /api/about/team:', error)
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

    const { user } = adminResult
    const body: CreateTeamMemberData = await request.json()

    if (!body.name || !body.role || !body.image_url) {
      return NextResponse.json(
        { error: 'Missing required fields: name, role, image_url' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('about_team_members')
      .insert({
        name: body.name,
        role: body.role,
        image_url: body.image_url,
        display_order: body.display_order ?? 0,
        created_by: user.id,
        updated_by: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating team member:', error)
      return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/about/team:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

