import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function AccessDenied() {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={() => signIn()}>Sign In</button>
      <Link href='/'>Go Home</Link>
    </div>
  )
}
