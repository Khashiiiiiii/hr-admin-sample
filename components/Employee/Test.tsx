'use client'
import { useState } from 'react'
import styles from './Test.module.scss'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { signOut } from 'next-auth/react'

const Test = () => {
  const [step, setStep] = useState<number>(1)

  const questions = [
    {
      type: 'radio',
      title:
        '۱-در مقایسه با سازمانهای مشابه و کار و فعالیتم، احساس می­کنم حقوق و مزایایم در محدوده قابل قبول است'
    },
    {
      type: 'radio',
      title:
        '۲- در درون سازمان، در مقایسه با دیگر کارکنان حقوق و مزایایم عادلانه است.'
    },
    {
      type: 'radio',
      title:
        '۳- در این سازمان امکانات رفاهی به طور عادلانه بین کارکنان توزیع می­ شود.'
    },
    {
      type: 'radio',
      title: '۴- شغل و مسئولیت من با توانایی هایم متناسب است.'
    },
    {
      type: 'radio',
      title: '۵- اکثر اوقات از مشاهده نتایج کارم احساس خشنودی می­ کنم.'
    }
  ]

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.progress}
        style={{
          width: `${(step * 100) / 3}%`,
          transition: 'ease-in-out',
          transitionDuration: '300ms'
        }}
      />
      <div className={styles.testContent}>
        {step === 1 ? (
          <>
            <div className={styles.testHead}>
              <h1 className={styles.testTitle}>آزمون رضایت شغلی</h1>
              <div>
                <p>
                  هوش هیجانی فاکتوری است که امروزه در دنیا از آن به عنوان عاملی
                  که در موفقیت و رضایت ما از زندگی نقش دارد یاد می شود.
                </p>
                <p>
                  مولفه های تشکیل دهنده هوش هیجانی در عمل با یکدیگر در تعامل
                  هستند و یک مرز کاملی بین آنها وجود ندارد، بلکه روی یکدیگر اثر
                  می گذارند
                </p>
              </div>
            </div>
            <div className={styles.testBody}>
              <div className={styles.input}>
                <Input placeholder='نام' />
              </div>
              <div className={styles.input}>
                <Input placeholder='نام خانوادگی' />
              </div>
              <div className={styles.input}>
                <Input placeholder='سن' />
              </div>
              <div className={styles.input}>
                <Input placeholder='نام سازمان' />
              </div>
              <div className={styles.input}>
                <Input placeholder='نام سمت سازمانی' />
              </div>
              <div className={styles.input}>
                <Input placeholder='نام دپارتمان' />
              </div>
            </div>
            <Button
              className={styles.btn}
              onClick={() => setStep(step => step + 1)}
            >
              شروع
            </Button>
          </>
        ) : step === 2 ? (
          <>
            <h1 className={styles.testTitle}>آزمون هوش هیجانی</h1>
            <div className={styles.testBody}>
              <ol className={styles.questionsWrapper}>
                {questions.map(item => (
                  <li key={item.title}>
                    <p>{item.title}</p>
                    <RadioGroup className={styles.radioGroup}>
                      <div className={styles.radioItem}>
                        <Label htmlFor='fully-agreed'>کاملا موافقم</Label>
                        <RadioGroupItem
                          value='fully agreed'
                          id='fully-agreed'
                          className={styles.radio}
                        />
                      </div>
                      <div className={styles.radioItem}>
                        <Label htmlFor='agreed'>موافقم</Label>
                        <RadioGroupItem
                          value='agreed'
                          id='agreed'
                          className={styles.radio}
                        />
                      </div>
                      <div className={styles.radioItem}>
                        <Label htmlFor='somehow'>تاحدودی</Label>
                        <RadioGroupItem
                          value='somehow'
                          id='somehow'
                          className={styles.radio}
                        />
                      </div>
                      <div className={styles.radioItem}>
                        <Label htmlFor='disagreed'>مخالفم</Label>
                        <RadioGroupItem
                          value='disagreed'
                          id='disagreed'
                          className={styles.radio}
                        />
                      </div>
                      <div className={styles.radioItem}>
                        <Label htmlFor='fully-disagreed'>کاملا مخالفم</Label>
                        <RadioGroupItem
                          value='fully-disagreed'
                          id='fully-disagreed'
                          className={styles.radio}
                        />
                      </div>
                    </RadioGroup>
                  </li>
                ))}
              </ol>
            </div>
            <Button
              className={styles.btn}
              onClick={() => setStep(step => step + 1)}
            >
              بعدی
            </Button>
          </>
        ) : (
          step === 3 && (
            <>
              <div className={styles.testBody}>آزمون شما به پایان رسید</div>
              <Button
                className={styles.btn}
                onClick={async () => {
                  await signOut()
                }}
              >
                خروج
              </Button>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default Test
