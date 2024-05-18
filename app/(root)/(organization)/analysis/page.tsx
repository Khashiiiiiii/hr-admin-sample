import { Search } from "@/components/Search";
import styles from "./styles.module.scss";

import { DataTable } from "@/components/Tables";
import {
  companiesColumns,
  companiesSubColumns,
  TCompanies,
} from "@/components/Tables/Columns";
import { auth } from "@/auth";
import { Metadata } from "next";

async function getCompaniesData(): Promise<TCompanies[]> {
  return [
    {
      id: "1241479",
      title: "دیزاین استودیو",
      tests: [
        {
          id: "",
          employersTotalCount: 423,
          participantsCount: 74,
          title: "رضایت شغلی",
        },
      ],
    },
  ];
}

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا | تحلیل کلی",
};

export default async function AnalysisPage() {
  const data = await getCompaniesData();
  const session = await auth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSection}>
        {/* @ts-ignore  */}
        <Search placeholder="سازمان‌ها" />
      </div>

      {/* <DataTable
        columns={companiesColumns}
        data={data}
        //@ts-ignore
        subColumns={companiesSubColumns}
      /> */}
    </div>
  );
}
