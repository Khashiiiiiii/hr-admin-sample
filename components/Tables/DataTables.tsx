"use client";

import styles from "./DataTables.module.scss";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  getPaginationRowModel,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import ArrowRight from "@/components/svg/arrow-right.svg";
import ArrowLeft from "@/components/svg/arrow-left.svg";
import {
  IEmployee,
  IEmployeeList,
  IGetEmployeeAllExamsList,
  IGetExamsList,
} from "@/interfaces";
import {
  getEmployeeAllExams,
  getEmployeeList,
  getOrganizationPositionsFilters,
} from "@/services";
import { TContacts } from "./Columns";
import { Session } from "next-auth";
import { Skeleton } from "../ui/skeleton";
import { IExam } from "@/interfaces/manager";
import { ExpandedRow } from "./ExpandedRow";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<IEmployee, TValue>[] | ColumnDef<IGetExamsList, TValue>[];
  data: IEmployeeList;
  subColumns?: ColumnDef<IEmployee, TValue>[];
  session: Session;
  type: "employee" | "test";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  subColumns,
  type,
  session,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<IEmployee | IGetExamsList>>(
    data.results
  );

  const table = useReactTable({
    data: tableData,
    /* @ts-ignore */
    columns,
    state: {
      expanded,
    },
    initialState: { pagination: { pageSize: 7 } },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(), // Enable row expansion
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    rowCount: data.count,
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  // Calculate displayed items
  const startItem = pageIndex * pageSize + 1;
  const endItem = startItem + table.getRowModel().rows.length - 1;
  const totalItems = data.count;
  const pageNumbers: number[] = [];

  for (let i = 1; i <= table.getPageOptions().length; i++) {
    // Always add the first and last page
    if (
      i === 1 ||
      i === table.getPageOptions().length ||
      (i >= pageIndex - 1 && i <= pageIndex + 1)
    ) {
      pageNumbers.push(i);
    }
  }

  // Insert ellipses where there are gaps
  const pagesWithEllipses = pageNumbers.reduce((acc, pageNum, idx) => {
    if (idx > 0 && pageNumbers[idx - 1] !== pageNum - 1) {
      // @ts-ignore
      acc.push("...");
    }
    // @ts-ignore
    acc.push(pageNum);
    return acc;
  }, []);

  useEffect(() => {
    if (type === "employee") {
      table.resetExpanded();
      setLoading(true);
      getEmployeeList({
        token: session.user.accessToken!,
        params: { page: pageIndex + 1, page_size: 7 },
      })
        .then((res) => setTableData(res.results))
        .finally(() => setLoading(false));
    }
  }, [pageIndex]);

  useEffect(() => {}, [tableData]);

  return (
    <div className={styles.wholeCompWrapper}>
      <div className={styles.outerWrapper}>
        <Table className={styles.wrapper}>
          <TableHeader className={styles.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className={styles.tableRow} key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={styles.tableHead}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={styles.tableBody}>
            {loading ? (
              <>
                {[...Array(7)].map((_, index) => (
                  <TableRow key={index} className={styles.skeletonWrapper}>
                    {[...Array(7)].map((_, index) => (
                      <TableCell key={index} className={styles.tableCell}>
                        <Skeleton
                          className={cn(
                            index === 0 ? styles.square : styles.rect
                          )}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      styles.tableRow,
                      row.getIsExpanded() && styles.activeTableRow
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={styles.tableCell}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* @ts-ignore */}
                  {row.getIsExpanded() && (
                    <ExpandedRow
                      /* @ts-ignore */
                      columns={columns}
                      row={row}
                      /* @ts-ignore */
                      subColumns={subColumns}
                    />
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className={styles.paginationWrapper}>
        <div className={styles.count}>
          نمایش {endItem.toLocaleString("fa-IR")} از{" "}
          {totalItems.toLocaleString("fa-IR")}
        </div>
        <div className={styles.pagination}>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <div>
              <ArrowRight />
            </div>
            بعدی
          </Button>
          <div className={styles.pagesWrapper}>
            {/* {table.getPageOptions().map(item => (
              <span
                key={item}
                onClick={() => {
                  table.setPageIndex(item)
                }}
                className={cn(
                  styles.pageIndex,
                  pageIndex === item && styles.activePage
                )}
              >
                {(item + 1).toLocaleString('fa-IR')}
              </span>
            ))} */}
            {pagesWithEllipses.map((page, idx) => (
              <span
                key={idx}
                onClick={() => table.setPageIndex(page - 1)}
                className={cn(
                  styles.pageIndex,
                  pageIndex + 1 === page && styles.activePage
                )}
              >
                {/* @ts-ignore */}
                {page.toLocaleString("fa-IR")}
              </span>
            ))}
          </div>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            قبلی
            <div>
              <ArrowLeft />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
