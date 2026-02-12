import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardClient } from './dashboard-client'
import type { Database } from '@/types/database.types'

interface Conference {
  role: Database['public']['Enums']['user_role']
  attended: number[]
  org_id: string
  organization: {
    name: string
    short_name: string | null
    base_url: string
  }
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: conferences, error } = await supabase
    .from('member')
    .select('role,attended,org_id,organization!member_org_id_fkey(name,short_name,base_url)')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching conferences:', error)
  }

  return (
    <DashboardClient
      conferences={(conferences ?? []) as Conference[]}
      totalCount={conferences?.length ?? 0}
    />
  )
}
