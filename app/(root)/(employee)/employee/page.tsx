import { auth } from "@/auth";
import styles from "./styles.module.scss";
import { Metadata } from "next";
import { getEmployeeRemainingExams } from "@/services";
import { IGetEmployeeRemainingExams } from "@/interfaces";
import Link from "next/link";

async function getEmployeeExams(
  token: string
): Promise<IGetEmployeeRemainingExams> {
  try {
    const data = await getEmployeeRemainingExams(token);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا | لیست آزمون‌ها ",
};

export default async function EmployeePage() {
  const session = await auth();
  const data = await getEmployeeExams(session?.user.accessToken!);

  return (
    <div className={styles.wrapper}>
      <h1>انتخاب آزمون</h1>
      <div className={styles.tableOuterWrapper}>
        <ul>
          <li className={styles.header}>نام آزمون</li>
          {data.result.length > 0 ? (
            data.result.map((exam, index) => (
              <li key={index} className={styles.item}>
                <span>{exam.name}</span>
                <Link href={`employee/exam/${exam.id}`} className={styles.btn}>
                  شروع
                </Link>
              </li>
            ))
          ) : (
            <p>آزمونی برای شما وجود ندارد</p>
          )}
        </ul>
      </div>
    </div>
  );
}
