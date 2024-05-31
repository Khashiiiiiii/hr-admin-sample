"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import styles from "./LoginForm.module.scss";
import { KeyboardEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().regex(new RegExp(`^[a-zA-Z0-9$@$!%*?&#^-_. +]+$`), {
    message: "از حروف انگلیسی استفاده کنید",
  }),
  password: z.string().min(2, { message: "رمز عبور حداقل ۸ حرف می باشد" }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      form.handleSubmit(onSubmit)();
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError("");
    const login = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (login!.error !== null) {
      setLoading(false);
      setError("نام کاربری یا پسورد اشتباه است");
    } else {
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form className={styles.wrapper}>
        {error !== "" && <p className={styles.error}>{error}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem className={styles.emailInput}>
                <FormControl>
                  <Input placeholder="نام کاربری" {...field} />
                </FormControl>
              </FormItem>
              <FormMessage />
            </>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem className={styles.passwordInput}>
                <div
                  onClick={() =>
                    setPasswordShown((passwordShown) => !passwordShown)
                  }
                  className={styles.eye}
                >
                  {passwordShown ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </div>
                <FormControl>
                  <Input
                    placeholder="رمز عبور"
                    {...field}
                    type={passwordShown ? "text" : "password"}
                    onKeyDown={(event) => handleKeyDown(event)}
                  />
                </FormControl>
              </FormItem>
              <FormMessage />
            </>
          )}
        />

        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          className={cn(styles.submitBtn, loading && styles.disabled)}
          disabled={loading}
        >
          ورود
        </Button>
      </form>
    </Form>
  );
}
