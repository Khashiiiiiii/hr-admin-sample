import { Search } from "@/components/Search";
import styles from "./styles.module.scss";

import { DataTable } from "@/components/Tables";
import { organizationColumns } from "@/components/Tables/Columns";
import { auth } from "@/auth";
import { Metadata } from "next";
import { getAllOrganizationExam } from "@/services";
import { IGetAllOrganizationExam } from "@/interfaces";

async function getAllExams(token: string): Promise<IGetAllOrganizationExam> {
  try {
    const data = await getAllOrganizationExam(token);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا | تحلیل کلی",
};

export default async function AnalysisPage() {
  const session = await auth();
  const data = await getAllExams(session?.user.accessToken!);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        {/* @ts-ignore  */}
        <Search placeholder="سازمان‌ها" />
      </div>
      {/* @ts-ignore  */}
      <DataTable columns={organizationColumns} data={data} />
    </div>
  );
}
