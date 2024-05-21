import Link from "next/link";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import ArrowRightIcon from "@/components/svg/arrow-right.svg";
import { TestReport } from "@/components/TestReport";

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا |پاسخ آزمون",
};

export default async function TestReportById() {
  return (
    <div className={styles.wrapper}>
      <Link href="/contacts" className={styles.backBtn}>
        <span className={styles.iconWrapper}>
          <ArrowRightIcon />
        </span>
        بازگشت
      </Link>

      <div className={styles.testInfo}>
        <h1>پاسخ نامه آزمون رضایت شغلی</h1>
        <div>
          <h3>علی ابراهیمی</h3>
          <h4>دیزاین استودیو</h4>
        </div>
      </div>
      <TestReport />
    </div>
  );
}
