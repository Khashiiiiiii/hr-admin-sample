import { menuItems } from '@/constants'
import styles from './Aside.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import { MenuItem } from './MenuItem'

const Aside = ({ className }: { className?: string }) => {
  return (
    <aside className={clsx(styles.wrapper, className)}>
      <Image
        src='/assets/logo.png'
        alt='qualia logo'
        width={146}
        height={36.5}
      />

      <ul className={styles.menu}>
        {menuItems.map(item => (
          <li key={item.title}>
            <MenuItem link={item} />
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Aside
