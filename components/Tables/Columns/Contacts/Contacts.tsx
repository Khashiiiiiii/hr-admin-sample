"use client";

import { ColumnDef } from "@tanstack/react-table";
import styles from "./Contacts.module.scss";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import MoreSvg from "@/components/svg/more.svg";
import ArrowUp from "@/components/svg/arrow-up.svg";
import ArrowDown from "@/components/svg/arrow-down.svg";
import TestReport from "@/components/svg/test-report.svg";
import TestAnalysis from "@/components/svg/test-analysis.svg";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IEmployee } from "@/interfaces/managements";
import {
  PopoverContent,
  PopoverTrigger,
  Popover as ShadPopover,
} from "@/components/ui/popover";
import { Popover } from "@/components/Popover";
import Link from "next/link";

export type TExams = {
  id: string;
  title: string;
  status: string;
};

export const contactColumns: ColumnDef<IEmployee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className={styles.checkboxWrapper}>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={styles.arrowDown}
                onClick={() => table.toggleAllRowsSelected()}
              >
                <ArrowDown />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>انتخاب همه</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    cell: ({ row }) =>
      !(row.depth > 0) && (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstname",
    header: "نام",
  },
  {
    accessorKey: "lastname",
    header: "نام خانوادگی",
  },
  {
    accessorKey: "position",
    header: () => {
      return <Popover type="position" />;
    },
  },
  {
    accessorKey: "company",
    header: () => {
      return <Popover type="departement" />;
    },
  },
  {
    accessorKey: "email",
    header: "آدرس ایمیل",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row, table }) => (
      <div className={styles.actions}>
        <div
          className={styles.arrow}
          onClick={() => {
            table.resetExpanded();
            row.getIsExpanded()
              ? row.toggleExpanded(false)
              : row.toggleExpanded(true);
          }}
        >
          {row.getIsExpanded() ? <ArrowUp /> : <ArrowDown />}
        </div>
        <ShadPopover>
          <PopoverTrigger className={styles.more}>
            <div>
              <MoreSvg />
            </div>
          </PopoverTrigger>
          <PopoverContent className={styles.moreContent}>
            <Button className={styles.sendTest}>ارسال آزمون به مخاطب</Button>
            <Button className={styles.deleteContact}>حذف مخاطب</Button>
          </PopoverContent>
        </ShadPopover>
      </div>
    ),
  },
];

export const contactSubColumns: ColumnDef<TExams>[] = [
  {
    accessorKey: "title",
    header: "عنوان آزمون",
    //@ts-ignore
    cell: ({ row }) => <div className={styles.subTableTitle}>{row.name}</div>,
  },
  {
    accessorKey: "blank1",
    header: "",
  },
  {
    accessorKey: "blank2",
    header: "",
  },
  {
    accessorKey: "status",
    header: "وضعیت آزمون",
    cell: ({ row }) => (
      <div
        className={cn(
          styles.subTableStatus,
          //@ts-ignore
          row.ordata_filled && styles.done
        )}
      >
        {/* @ts-ignore */}
        {row.data_filled ? "انجام شده" : "انجام نشده"}
      </div>
    ),
  },

  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      console.log(row, "row");
      return (
        <div className={styles.subTableActions}>
          <Button
            className={styles.sendTest}
            //@ts-ignore
            disabled={row.status !== "done"}
          >
            <span>
              <TestAnalysis />
            </span>
            تحلیل آزمون
          </Button>
          <Link className={styles.deleteContact} href={`/contacts/${row.id}`}>
            <span>
              <TestReport />
            </span>
            مشاهده پاسخ
          </Link>
          <ShadPopover>
            <PopoverTrigger
              className={styles.more}
              //@ts-ignore
              disabled={row.status !== "done"}
            >
              <div>
                <MoreSvg />
              </div>
            </PopoverTrigger>
            <PopoverContent className={styles.subTableMoreContent}>
              <Button className={styles.sendTestAgain}>ارسال مجدد</Button>
            </PopoverContent>
          </ShadPopover>
        </div>
      );
    },
  },
];
