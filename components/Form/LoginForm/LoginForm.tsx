'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import styles from './LoginForm.module.scss'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(2, { message: 'رمز عبور حداقل ۸ حرف می باشد' })
})

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [passwordShown, setPasswordShown] = useState<boolean>(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn('credentials', {
      redirect: true,
      email: values.email,
      password: values.password
    })
  }

  return (
    <Form {...form}>
      <form className={styles.wrapper}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className={styles.emailInput}>
              <FormControl>
                <Input placeholder='ایمیل' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className={styles.passwordInput}>
              <div
                onClick={() =>
                  setPasswordShown(passwordShown => !passwordShown)
                }
                className={styles.eye}
              >
                {passwordShown ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </div>
              <FormControl>
                <Input
                  placeholder='رمز عبور'
                  {...field}
                  type={passwordShown ? 'text' : 'password'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='button'
          onClick={form.handleSubmit(onSubmit)}
          className={styles.submitBtn}
        >
          ورود
        </Button>
      </form>
    </Form>
  )
}
