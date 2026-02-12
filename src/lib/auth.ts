/**
 * Check if a user is an admin
 * @param email User's email address
 * @returns Promise<boolean> - True if user is admin
 */
export async function checkAdmin(email: string): Promise<boolean> {
  try {
    const response = await fetch('/api/check-admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      return false
    }

    const { isAdmin } = await response.json()
    return isAdmin
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}
