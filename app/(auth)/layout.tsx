import '@/styles/globals.scss'

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='fa' dir='rtl'>
      <body className='flex h-screen w-screen'>{children}</body>
    </html>
  )
}

export default AuthLayout
