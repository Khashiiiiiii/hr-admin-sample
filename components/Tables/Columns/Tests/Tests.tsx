"use client";

import { ColumnDef } from "@tanstack/react-table";

import styles from "./Tests.module.scss";

export type TTests = {
  id: string;
  title: string;
  // uploadDate: Date
  // updateDate: Date
};

export const testsColumns: ColumnDef<TTests>[] = [
  {
    accessorKey: "name",
    header: "عنوان آزمون",
  },
  // {
  //   accessorKey: 'uploadDate',
  //   header: 'تاریخ بارگذاری'
  // },
  // {
  //   accessorKey: 'updateDate',
  //   header: 'تاریخ بروزرسانی'
  // },

  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className={styles.actions}>
        {/* <div
          className={styles.arrow}
          onClick={() => {

            log(row, 'row')
            row.getIsExpanded()
              ? row.toggleExpanded(false)
              : row.toggleExpanded(true)
          }}
        >
          {row.getIsExpanded() ? <ArrowUp /> : <ArrowDown />}
        </div> */}
        {/* <Popover>
          <PopoverTrigger className={styles.more}>
            <div>
              <MoreSvg />
            </div>
          </PopoverTrigger>
          <PopoverContent className={styles.moreContent}>
            <Button className={styles.sendTest}>حذف آزمون</Button>
            <Button className={styles.deleteContact}>حذف مخاطب</Button>
          </PopoverContent>
        </Popover> */}
      </div>
    ),
  },
];
