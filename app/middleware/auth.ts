export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  const authRoutes = ['/login', '/register']
  const protectedRoutes = ['/dashboard']

  if (protectedRoutes.includes(to.path) && !user.value) {
    return navigateTo('/login')
  }

  if (authRoutes.includes(to.path) && user.value) {
    return navigateTo('/dashboard')
  }
})
