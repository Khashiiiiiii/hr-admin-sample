import Link from "next/link";
import styles from "./styles.module.scss";
import { TestUpload } from "@/components/Modal";
import { DataTable } from "@/components/Tables";
import { testsColumns } from "@/components/Tables/Columns";
import { auth } from "@/auth";
import { Metadata } from "next";
import { getExams } from "@/services";
import { IGetExamsList } from "@/interfaces";

async function getTestData(token: string): Promise<IGetExamsList> {
  try {
    const data = await getExams(token);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا | آزمون‌ها",
};

export default async function TestPage() {
  const session = await auth();
  const data = await getTestData(session?.user.accessToken!);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        <div className={styles.btnGroup}>
          <Link
            className={styles.downloadLink}
            href="/path/to/your/excel/file.xlsx"
            download="Filename.xlsx"
            target="_blank"
          >
            نمونه فایل آزمون(Excel)
          </Link>
          <TestUpload />
        </div>
      </div>
      {/* @ts-ignore  */}
      <DataTable columns={testsColumns} data={data} />
    </div>
  );
}
