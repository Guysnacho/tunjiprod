import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = await createServiceRoleClient()

    // Look up the user by email in auth.users
    const { data: usersData, error: listError } = await supabase.auth.admin.listUsers({
      perPage: 100,
    })

    if (listError) {
      console.error('Error listing users:', listError)
      return NextResponse.json(
        { error: 'Failed to look up user' },
        { status: 500 }
      )
    }

    const authUser = usersData.users.find((u) => u.email === email)

    if (!authUser) {
      return NextResponse.json({ isAdmin: false })
    }

    // Check if user has role = 'admin' in the member table
    const { data: member, error: memberError } = await supabase
      .from('member')
      .select('role')
      .eq('user_id', authUser.id as any)
      .maybeSingle()

    if (memberError || !member) {
      return NextResponse.json({ isAdmin: false })
    }

    return NextResponse.json({ isAdmin: (member as any)?.role === 'admin' })
  } catch (error) {
    console.error('Error in check-admin route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
