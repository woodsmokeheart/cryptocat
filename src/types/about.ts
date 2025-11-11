export interface AboutDescription {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
  created_by?: string | null
  updated_by?: string | null
}

export interface AboutDescriptionPayload {
  title: string
  description: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image_url: string
  display_order: number
  created_at: string
  updated_at: string
  created_by?: string | null
  updated_by?: string | null
}

export interface CreateTeamMemberData {
  name: string
  role: string
  image_url: string
  display_order?: number
}

export interface UpdateTeamMemberData extends Partial<CreateTeamMemberData> {}

