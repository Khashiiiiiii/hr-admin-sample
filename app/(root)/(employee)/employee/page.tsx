import { auth } from "@/auth";

import styles from "./styles.module.scss";
import Test from "@/components/Employee/Test";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا | آزمون",
};

export default async function ContactsPage() {
  const session = await auth();

  return (
    <div className={styles.wrapper}>
      <Test />
    </div>
  );
}
