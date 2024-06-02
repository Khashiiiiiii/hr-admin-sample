import styles from "./styles.module.scss";
import { DataTable } from "@/components/Tables";
import {
  contactColumns,
  contactSubColumns,
} from "@/components/Tables/Columns/Contacts";
import { auth } from "@/auth";
import { Metadata } from "next";
import { getEmployeeList } from "@/services";
import { IEmployeeList } from "@/interfaces";
import { SessionProvider } from "next-auth/react";
import { TopSection } from "@/components/TopSection";

async function getContactsData(token: string): Promise<IEmployeeList> {
  try {
    const data = await getEmployeeList({
      token,
      params: { page: 1, page_size: 7 },
    });
    return data;
  } catch (error) {
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
        <TopSection type="employee" />
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
