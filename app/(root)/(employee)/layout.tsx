import styles from "./styles.module.scss";
import "@/styles/globals.scss";
import { cn, iranYekan } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { Nav } from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";

export default async function EmployeeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="fa" dir="rtl">
        <body className={cn(iranYekan.className, styles.wrapper)}>
          <Nav type={"employee"} className={styles.nav} />
          <main className={styles.main}>{children}</main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
