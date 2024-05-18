import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import {
  apiAuthPrefix,
  authRoute,
  defaultEmployeesLoginRedirect,
  defaultOrganizationsLoginRedirect
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoute.includes(nextUrl.pathname)
  const userRole = req.auth?.user.role

  if (isApiAuthRoute) {
    return undefined
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (userRole === 'Employee') {
        return Response.redirect(
          new URL(defaultEmployeesLoginRedirect, nextUrl)
        )
      } else {
        return Response.redirect(
          new URL(defaultOrganizationsLoginRedirect, nextUrl)
        )
      }
    }
    return undefined
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  if (userRole === 'Employee' && !nextUrl.pathname.startsWith('/employee')) {
    // Employee users are only allowed to access routes under "/employee"
    return Response.redirect(new URL('/employee', nextUrl))
  } else if (
    userRole === 'Organization' &&
    nextUrl.pathname.startsWith('/employee')
  ) {
    // Organization users are not allowed to access "/employee" route
    return Response.redirect(new URL('/', nextUrl))
  }

  return undefined
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
