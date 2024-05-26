"use client"

import styles from "./Nav.module.scss";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { BellIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react"
import {  useRouter } from "next/navigation";

const Nav = ({ className }: { className?: string }) => {
  const router = useRouter()
  return (
    <nav className={cn(styles.wrapper, className)}>
      {/* <Button variant='outline' size='icon' className={styles.btn}>
        <BellIcon className={styles.icon} />
      </Button> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={styles.dropdownTrigger}>
            <div className={styles.label}>
              <ChevronDownIcon />
              test@gmail.com
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>test@gmail.com</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={styles.formWrapper}>
            <form
              action={async () => {
                await signOut().then(() => router.refresh());
              }}
              className={styles.form}
            >
              <Button type="submit" className={styles.exitBtn}>
                خروج
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Nav;
