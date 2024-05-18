'use client'

import { Button } from '@/components/ui/button'
import Modal from '../Modal'
import styles from './TestUpload.module.scss'

const TestUpload = () => {
  return (
    <Modal
      FooterNode={<Button className={styles.uploadBtn}>بارگذاری</Button>}
      title='بارگذاری آزمون'
      description='آزمون را بارگذاری کنید'
      triggerText='بارگذاری آزمون(Excel)'
      className={styles.wrapper}
      triggerTextClassName={styles.triggerText}
    >
      <Button className={styles.file}>بارگذاری آزمون (Excel)</Button>
    </Modal>
  )
}

export default TestUpload
