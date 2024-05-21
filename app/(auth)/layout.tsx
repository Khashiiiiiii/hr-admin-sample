import { cn, iranYekan } from "@/lib/utils";
import "@/styles/globals.scss";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="fa" dir="rtl">
      <body className={cn(iranYekan.className, "flex h-screen w-screen")}>
        {children}
      </body>
    </html>
  );
};

export default AuthLayout;
