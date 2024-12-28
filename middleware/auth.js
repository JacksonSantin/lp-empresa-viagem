export default defineNuxtRouteMiddleware(async middleware => {
  const token = useCookie('token')

  if (!token.value) {
    return navigateTo('/login')
  }
})
