'use client'

import Link from 'next/link'
import styles from './MenuItem.module.scss'
import { usePathname } from 'next/navigation'
import AnalysisSvg from '@/components/svg/analysis.svg'
import ContactsSvg from '@/components/svg/contacts.svg'
import TestsSvg from '@/components/svg/tests.svg'
import { cn } from '@/lib/utils'

interface IMenuItem {
  classname?: string
  link: {
    href: '/contacts' | '/analysis' | '/tests'
    title: string
  }
  onClick?: () => void
}

const MenuItem = ({ link: { href, title }, classname, onClick }: IMenuItem) => {
  const pathname = usePathname()
  const isActive = (href: string) => pathname.startsWith(href)

  const hrefHandler = () => {
    switch (href) {
      case '/contacts':
        return <ContactsSvg />
      case '/analysis':
        return <AnalysisSvg />
      case '/tests':
        return <TestsSvg />

      default:
        return <></>
    }
  }
  return (
    <Link
      href={href}
      className={cn(
        styles.wrapper,
        classname && classname,
        isActive(href) && styles.active
      )}
      onClick={onClick}
    >
      <div>{hrefHandler()}</div>
      {title}
    </Link>
  )
}

export default MenuItem
