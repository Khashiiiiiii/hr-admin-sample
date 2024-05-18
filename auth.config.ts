import type { NextAuthConfig } from 'next-auth'
import Credentials, { CredentialsConfig } from 'next-auth/providers/credentials'
import { login } from './services'

const credentialsConfig: CredentialsConfig = Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email' },
    password: { type: 'password', label: 'Password' }
  },
  async authorize(credentials) {
    const user = await login({
      username: credentials.email as string,
      password: credentials.password as string
    })

    if (!user) {
      return null
    }

    return {
      email: credentials.email as string,
      role: user.type,
      accessToken: user.access,
      refreshToken: user.refresh
    }

    // if (
    //   credentials.email === 'employee@mail.com' &&
    //   credentials.password === 'employee'
    // ) {
    //   return {
    //     email: 'employee@mail.com',
    //     role: 'Employee',
    //     accessToken: 'employeeAccess',
    //     refreshToken: 'employeeRefresh'
    //   }
    // } else if (
    //   credentials.email === 'organization@mail.com' &&
    //   credentials.password === 'organization'
    // ) {
    //   return {
    //     email: 'organization@mail.com',
    //     role: 'Organization',
    //     accessToken: 'organizationAccess',
    //     refreshToken: 'organizationRefresh'
    //   }
    // } else {
    //   return null
    // }
  }
})

export default {
  providers: [credentialsConfig],

  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.accessToken = token.accessToken as string
        session.user.refreshToken = token.refreshToken as string
        // @ts-ignore
        session.user.role = token.role as string
      }
      return session
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.role = user.role
      }
      return token
    }
  },
  pages: {
    signIn: '/login'
  }
} satisfies NextAuthConfig
