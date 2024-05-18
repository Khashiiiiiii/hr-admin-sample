import { auth } from '@/auth'
import styles from './styles.module.scss'
import QualiaLogo from '@/components/svg/qualia.svg'
import { LoginForm } from '@/components/Form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'اورگانومتر کوآلیا | ورود'
}

const LoginPage = async () => {
  const session = await auth()

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <div className={styles.overlay} />
        <div className={styles.qualiaLogo}>
          <QualiaLogo />
        </div>
      </div>
      <div className={styles.loginWrapper}>
        <div className={styles.loginFormWrapper}>
          <h1 className={styles.title}>به کوآلیا خوش آمدید!</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
