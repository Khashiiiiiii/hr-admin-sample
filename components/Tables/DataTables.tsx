"use client";

import styles from "./DataTables.module.scss";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import ArrowRight from "@/components/svg/arrow-right.svg";
import ArrowLeft from "@/components/svg/arrow-left.svg";
import {
  IEmployee,
  IEmployeeList,
  IGetAllOrganizationExam,
  IGetExamsList,
  IGetOrganizationExam,
} from "@/interfaces";
import { getEmployeeList } from "@/services";
import { Session } from "next-auth";
import { Skeleton } from "../ui/skeleton";
import { ExpandedRow } from "./ExpandedRow";
import { useStore } from "@/store";
import { TestSend } from "../Modal/TestSend";

interface DataTableProps<TData, TValue> {
  columns:
    | ColumnDef<IEmployee, TValue>[]
    | ColumnDef<IGetOrganizationExam, TValue>[];
  data: IEmployeeList | IGetAllOrganizationExam;
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
  const [tableData, setTableData] = useState<
    Array<IEmployee | IGetOrganizationExam>
  >(data.results);

  const selectedRef = useRef(null);
  const initialRender = useRef(true);

  const [selected, setSelected] = useState<IEmployee[]>([]);

  const tableRows = useStore((state) => state.tableRows);
  const setTableRowsLoading = useStore((state) => state.setTableRowsLoading);
  const tableRowsLoading = useStore((state) => state.tableRowsLoading);

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
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (type === "employee") {
      table.resetExpanded();
      table.resetRowSelection(false);
      setSelected([]);
      setTableRowsLoading(true);

      getEmployeeList({
        token: session.user.accessToken!,
        params: { page: pageIndex + 1, page_size: 7 },
      })
        .then((res) => {
          setTableData(res.results);
        })
        .finally(() => setTableRowsLoading(false));
    }
  }, [pageIndex]);

  useEffect(() => {
    if (tableRows !== null) {
      setTableData(tableRows.results);
      table.setState((oldState) => ({
        ...oldState,
        pagination: {
          ...oldState.pagination,

          pageCount: Math.ceil(tableRows.count / 7),
        },
      }));
    }
  }, [tableRows]);

  useEffect(() => {
    if (table.getSelectedRowModel().flatRows.length > 0) {
      setSelected(
        table
          .getSelectedRowModel()
          .flatRows.map((item) => item.original as IEmployee)
      );
    } else {
      setSelected([]);
    }
  }, [table.getSelectedRowModel()]);

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
            {tableRowsLoading ? (
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
                      /* @ts-ignore */
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
                  کاربری وجود ندارد
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {selected.length > 0 && (
            <TableFooter className={styles.tableFooter}>
              <TableRow className={styles.selectedWrapper} ref={selectedRef}>
                <TableCell />

                <TableCell className={styles.text}>
                  {selected.length.toLocaleString("fa-IR")} نفر انتخاب شده{" "}
                  {selected.length > 1 ? "اند" : "است"}
                </TableCell>
                {[...Array(4)].map(() => (
                  <TableCell />
                ))}

                <TableCell className={styles.button}>
                  <TestSend selectedUsers={selected} />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
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
