import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { email } = await readBody<{ email: string }>(event)

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  const client = serverSupabaseServiceRole(event)

  // Look up the user by email in auth.users
  const { data: usersData, error: listError } = await client.auth.admin.listUsers()

  if (listError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to look up user' })
  }

  const authUser = usersData.users.find((u) => u.email === email)

  if (!authUser) {
    return { isAdmin: false }
  }

  // Check if user has role = 'admin' in the member table
  const { data: member, error: memberError } = await client
    .from('member')
    .select('role')
    .eq('user_id', authUser.id)
    .single()

  if (memberError || !member) {
    return { isAdmin: false }
  }

  return { isAdmin: member.role === 'admin' }
})
