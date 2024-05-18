import { Search } from "@/components/Search";
import styles from "./styles.module.scss";
import Link from "next/link";
import { ExcelUpload } from "@/components/Modal";
import { DataTable } from "@/components/Tables";
import {
  contactColumns,
  contactSubColumns,
} from "@/components/Tables/Columns/Contacts";
import { auth, signOut } from "@/auth";
import { Metadata } from "next";
import { getEmployeeList } from "@/services";
import { IEmployeeList } from "@/interfaces";
import { SessionProvider } from "next-auth/react";

async function getContactsData(token: string): Promise<IEmployeeList> {
  try {
    const data = await getEmployeeList({
      token,
      params: { page: 1, page_size: 7 },
    });
    return data;
  } catch (error) {
    // @ts-ignore
    // if (error.cause === 401) {
    //   signOut();
    // }
    // @ts-ignore

    throw new Error("Failed to fetch data");
  }
}

export const metadata: Metadata = {
  title: "اورگانومتر کوآلیا | کارمندان",
};

export default async function ContactsPage() {
  const session = await auth();
  const data = await getContactsData(session?.user.accessToken!);

  return (
    <SessionProvider session={session}>
      <div className={styles.wrapper}>
        <div className={styles.topSection}>
          {/* @ts-ignore  */}
          <Search placeholder="کارمندان" />
          <div className={styles.btnGroup}>
            <Link
              className={styles.downloadLink}
              href="/path/to/your/excel/file.xlsx"
              download="Filename.xlsx"
              target="_blank"
            >
              نمونه لیست کارمندان(Excel)
            </Link>
            <ExcelUpload />
          </div>
        </div>

        <DataTable
          columns={contactColumns}
          data={data}
          //@ts-ignore
          subColumns={contactSubColumns}
          session={session!}
          type="employee"
        />
      </div>
    </SessionProvider>
  );
}
