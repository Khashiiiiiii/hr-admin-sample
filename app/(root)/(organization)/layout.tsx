import { Aside } from '@/components/Aside'
import { Nav } from '@/components/Nav'
import '@/styles/globals.scss'
import styles from './styles.module.scss'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang='fa-IR' dir='rtl'>
        <body className={styles.layoutWrapper}>
          <Aside />
          <main className={styles.main}>
            <Nav />
            <div className={styles.contentWrapper}>{children}</div>
          </main>
        </body>
      </html>
    </SessionProvider>
  )
}
