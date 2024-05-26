"use client"

import Image from "next/image";
import styles from "./styles.module.scss";
import "@/styles/globals.scss";
import { cn, iranYekan } from "@/lib/utils";
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



export default function EmployeeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()

  return (
    <html lang="fa" dir="rtl">
      <body className={cn(iranYekan.className, styles.wrapper)}>
        <nav className={styles.nav}>
          <Image
            src="/assets/logo.png"
            alt="qualia logo"
            width={146}
            height={36.5}
          />

          <form
            action={async() => {

               await signOut().then(() => router.refresh());
            }}
            className={styles.form}
          >
            <Button type="submit" className={styles.exitBtn}>
              خروج
            </Button>
          </form>
        </nav>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
