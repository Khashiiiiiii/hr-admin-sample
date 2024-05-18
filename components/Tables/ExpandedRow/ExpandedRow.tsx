"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IEmployee, IGetExamsList } from "@/interfaces";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import styles from "./ExpandedRow.module.scss";
import { useEffect, useState } from "react";
import { IExam } from "@/interfaces/manager";
import { getEmployeeAllExams } from "@/services";
import { useSession } from "next-auth/react";

const ExpandedRow = ({
  row,
  columns,
  subColumns,
}: {
  row: Row<IEmployee | IGetExamsList>;
  columns: ColumnDef<IEmployee | IGetExamsList, any>[];
  subColumns: ColumnDef<IEmployee, any>[];
}) => {
  const [subtableData, setSubTableData] = useState<IExam[]>();
  const session = useSession();

  useEffect(() => {
    // @ts-ignore
    getEmployeeAllExams(session.data?.user.accessToken!, row.original.id)
      .then((res) => {
        setSubTableData(res.results);
      })
      .catch((err) => console.log(err, "errrp"));
  }, []);

  return (
    <TableRow className={styles.expandedTableRow} key={row.id}>
      <TableCell colSpan={columns.length} className={styles.tableCell}>
        <Table className={styles.innerTable}>
          <TableHeader className={styles.tableHeader}>
            <TableRow className={styles.subTableHeader}>
              {subColumns?.map((subColumn) => (
                <TableHead
                  key={subColumn.id}
                  className={styles.subTableHead}
                  colSpan={1}
                >
                  {subColumn.header
                    ? // @ts-ignore
                      flexRender(subColumn.header)
                    : subColumn.id}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className={styles.tableBody}>
            {subtableData ? (
              subtableData.map((subRow) => (
                <TableRow key={subRow.id} className={styles.tableRow}>
                  {subColumns?.map((subColumn) => (
                    <TableCell key={subColumn.id}>
                      {flexRender(subColumn.cell, {
                        // @ts-ignore
                        row: subRow,
                        // @ts-ignore
                        column: subColumn,
                        // @ts-ignore
                        value: subRow[subColumn.accessorKey],
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>هیج آزمون وجود ندارد</>
            )}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
};

export default ExpandedRow;
