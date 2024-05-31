"use client";

import styles from "./Nav.module.scss";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Nav = ({
  className,
  type,
}: {
  className?: string;
  type: "employee" | "organization";
}) => {
  const router = useRouter();
  const session = useSession();
  console.log(session, "session");
  return (
    <nav className={cn(styles.wrapper, className)}>
      {/* <Button variant='outline' size='icon' className={styles.btn}>
        <BellIcon className={styles.icon} />
      </Button> */}
      {type === "organization" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={styles.dropdownTrigger}>
              {/* @ts-ignore */}
              <span>{session.data?.user.email!}</span>
              <Avatar>
                <AvatarImage src="/assets/avatar.png" alt="avatar" />
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
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
      ) : (
        <>
          <Image
            src="/assets/logo.png"
            alt="qualia logo"
            width={146}
            height={36.5}
            className={styles.image}
          />
          <form
            action={async () => {
              await signOut().then(() => router.refresh());
            }}
            className={styles.form}
          >
            {/* @ts-ignore */}
            <span>{session.data?.user.email}</span>
            <Button type="submit" className={styles.exitBtn}>
              خروج
            </Button>
          </form>
        </>
      )}
    </nav>
  );
};

export default Nav;
