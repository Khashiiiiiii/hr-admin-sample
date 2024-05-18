'use client'

import { Button } from '@/components/ui/button'
import Modal from '../Modal'
import styles from './ExcelUpload.module.scss'

const ExcelUpload = () => {
  return (
    <Modal
      FooterNode={<Button className={styles.uploadBtn}>بارگذاری</Button>}
      title='لیست کارمندان'
      description='اکسل کارمندان را بارگذاری کنید'
      triggerText='بارگذاری لیست کارمندان(Excel)'
      className={styles.wrapper}
      triggerTextClassName={styles.triggerText}
    >
      <Button className={styles.file}>انتخاب فایل (Excel)</Button>
    </Modal>
  )
}

export default ExcelUpload
