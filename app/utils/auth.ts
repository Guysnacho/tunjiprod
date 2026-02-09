export async function checkAdmin(email: string): Promise<boolean> {
  try {
    const { isAdmin } = await $fetch('/api/check-admin', {
      method: 'POST',
      body: { email }
    })
    return isAdmin
  } catch {
    return false
  }
}
