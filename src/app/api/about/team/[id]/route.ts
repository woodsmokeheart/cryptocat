import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { UpdateTeamMemberData } from '@/types/about'

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

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const memberId = params.id

  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('about_team_members')
      .select('*')
      .eq('id', memberId)
      .maybeSingle()

    if (error) {
      console.error('Error fetching team member:', error)
      return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error in GET /api/about/team/${memberId}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const memberId = params.id

  try {
    const supabase = await createClient()

    const adminResult = await requireAdmin(supabase)
    if ('response' in adminResult) {
      return adminResult.response
    }

    const { user } = adminResult
    const body: UpdateTeamMemberData = await request.json()

    if (body.name !== undefined && body.name.trim().length === 0) {
      return NextResponse.json({ error: 'Name cannot be empty' }, { status: 400 })
    }

    if (body.role !== undefined && body.role.trim().length === 0) {
      return NextResponse.json({ error: 'Role cannot be empty' }, { status: 400 })
    }

    if (body.image_url !== undefined && body.image_url.trim().length === 0) {
      return NextResponse.json({ error: 'Image URL cannot be empty' }, { status: 400 })
    }

    const updates: Record<string, unknown> = {}
    if (body.name !== undefined) updates.name = body.name
    if (body.role !== undefined) updates.role = body.role
    if (body.image_url !== undefined) updates.image_url = body.image_url
    if (body.display_order !== undefined) updates.display_order = body.display_order

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
    }

    updates.updated_by = user.id

    const { data, error } = await supabase
      .from('about_team_members')
      .update(updates)
      .eq('id', memberId)
      .select()
      .single()

    if (error) {
      console.error('Error updating team member:', error)
      return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error in PUT /api/about/team/${memberId}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const memberId = params.id

  try {
    const supabase = await createClient()

    const adminResult = await requireAdmin(supabase)
    if ('response' in adminResult) {
      return adminResult.response
    }

    const { error } = await supabase
      .from('about_team_members')
      .delete()
      .eq('id', memberId)

    if (error) {
      console.error('Error deleting team member:', error)
      return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/about/team/${memberId}:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

