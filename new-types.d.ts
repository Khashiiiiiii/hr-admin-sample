import 'next-auth'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string
      refreshToken?: string
      role?: 'Organization' | 'Employee' | 'super'
    } & DefaultSession
  }

  interface User {
    accessToken?: string
    refreshToken?: string
    role?: 'Organization' | 'Employee' | 'super'
  }
}
