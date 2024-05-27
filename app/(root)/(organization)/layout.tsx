import { Aside } from "@/components/Aside";
import { Nav } from "@/components/Nav";
import "@/styles/globals.scss";
import styles from "./styles.module.scss";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { cn, iranYekan } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="fa-IR" dir="rtl">
        <body className={cn(iranYekan.className, styles.layoutWrapper)}>
          <Aside />
          <main className={styles.main}>
            <Nav type="organization" />
            <div className={styles.contentWrapper}>{children}</div>
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
