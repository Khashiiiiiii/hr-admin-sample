"use client";

import {
  Popover as ShadPopover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import styles from "./Popover.module.scss";
import { Search } from "../Search";
import { useEffect, useState } from "react";
import FilterSvg from "@/components/svg/filter.svg";
import { Checkbox } from "../ui/checkbox";
import {
  getEmployeeList,
  getOrganizationDepartmentsFilters,
  getOrganizationPositionsFilters,
} from "@/services";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { useStore } from "@/store";

const Popover = ({ type }: { type: "position" | "departement" }) => {
  const [items, setItems] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setselected] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const setTablesRows = useStore((state) => state.setTableRows);
  const setTableRowsLoading = useStore((state) => state.setTableRowsLoading);

  const session = useSession();

  const handleSearch = () => {};

  useEffect(() => {
    if (open) {
      if (type === "position") {
        // Position api call
        getOrganizationPositionsFilters(session.data?.user.accessToken!).then(
          (res) => setItems(res.filters)
        );
      } else {
        // departement api call
        getOrganizationDepartmentsFilters(session.data?.user.accessToken!).then(
          (res) => setItems(res.filters)
        );
      }
    }
  }, [open]);

  const handleCheckboxChange = (item: string) => {
    setLoading(true);
    setselected((currentItems) => {
      if (currentItems.includes(item)) {
        return currentItems.filter((currentItem) => currentItem !== item);
      } else {
        return [...currentItems, item];
      }
    });
  };

  useEffect(() => {
    if (items?.length > 0) {
      setTableRowsLoading(true);
      if (type === "departement") {
        getEmployeeList({
          token: session.data?.user.accessToken!,
          params: {
            department_filter: selected.join("^"),
            page: 1,
            page_size: 7,
          },
        }).then((res) => {
          setTablesRows(res);
          setTableRowsLoading(false);
          setLoading(false);
        });
      } else {
        getEmployeeList({
          token: session.data?.user.accessToken!,
          params: {
            position_filter: selected.join("^"),
            page: 1,
            page_size: 7,
          },
        }).then((res) => {
          setTablesRows(res);
          setTableRowsLoading(false);
          setLoading(false);
        });
      }
    }
  }, [selected]);

  return (
    <ShadPopover onOpenChange={() => setOpen((open) => !open)} open={open}>
      <PopoverTrigger className={styles.positionTrigger}>
        عنوان {type === "departement" ? "دپارتمان" : "شغلی"}
        <div>
          <FilterSvg />
        </div>
      </PopoverTrigger>
      <PopoverContent className={styles.positionContent}>
        <Search
          placeholder={`${type === "position" ? "مشاغل" : "دپارتمان‌ها"}`}
          className={styles.search}
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <ul className={styles.list}>
          {items?.length > 0 ? (
            items.map((item) => (
              <li key={item} className={styles.listItem}>
                <Checkbox
                  aria-label="Select row"
                  checked={selected.includes(item)}
                  disabled={loading}
                  onCheckedChange={() => handleCheckboxChange(item)}
                />
                {item}
              </li>
            ))
          ) : (
            <>
              {[...Array(6)].map((_, index) => (
                <li key={index} className={styles.listItem}>
                  <Skeleton className={styles.checkboxSkeleton} />
                  <Skeleton className={styles.titleSkeleton} />
                </li>
              ))}
            </>
          )}
        </ul>
      </PopoverContent>
    </ShadPopover>
  );
};

export default Popover;
