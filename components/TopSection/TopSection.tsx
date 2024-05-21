"use client";

import Link from "next/link";
import { Search } from "../Search";
import { ExcelUpload } from "../Modal";
import styles from "./TopSection.module.scss";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { getEmployeeList, getEmployeeSearch } from "@/services";
import { useSession } from "next-auth/react";

const TopSection = ({ type }: { type: "employee" | "analysis" }) => {
  const [search, setSearch] = useState<string>("");
  const session = useSession();
  const setTableRows = useStore((state) => state.setTableRows);
  const setTableRowsLoading = useStore((state) => state.setTableRowsLoading);

  const handleSearch = () => {
    setTableRowsLoading(true);
    if (search !== "") {
      getEmployeeSearch(session.data?.user.accessToken!, search).then((res) => {
        setTableRows(res);
        setTableRowsLoading(false);
      });
    } else {
      getEmployeeList({
        token: session.data?.user.accessToken!,
        params: { page: 1, page_size: 7 },
      }).then((res) => {
        setTableRows(res);
        setTableRowsLoading(false);
      });
    }
  };

  return (
    <div className={styles.topSection}>
      <Search
        placeholder="کارمندان"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
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
  );
};

export default TopSection;
