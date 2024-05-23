"use client";
import { BarChart, PieChart } from "@/components/Charts";
import styles from "./Result.module.scss";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IGetReport } from "@/interfaces/manager";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Result = ({ item, index }: { index: number; item: IGetReport }) => {
  const color = ["#FFDDBD", "#FFF0F0", "#D5D9D7", "#AEC0F5", "#F08EC8"];

  const [type, setType] = useState<"bar" | "pie" | "table">(item.type);

  useEffect(() => {}, [type]);
  return (
    item.data.length > 0 && (
      <div className={styles.resultChart}>
        <h3>
          {(index + 1).toLocaleString("fa-IR")}- {item.title}
          {type !== "table" && (
            <Button
              onClick={() => (type === "bar" ? setType("pie") : setType("bar"))}
            >
              {type === "bar" ? "پای" : "بار"}
            </Button>
          )}
        </h3>
        {type === "pie" ? (
          <PieChart data={item.data} colors={color as string[]} />
        ) : type === "bar" ? (
          <BarChart data={item.data} color={"#ABDFF3" as string} />
        ) : (
          <div className={styles.tableWrapper}>
            <Table className={styles.table}>
              <TableHeader className={styles.header}>
                <TableRow className={styles.tableRow}>
                  <TableHead className={styles.tableHead}>
                    نام شرکت کننده
                  </TableHead>
                  <TableHead className={styles.tableHead}>پاسخ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className={styles.tableBody}>
                {item.data.map((data, index) => (
                  <TableRow key={index} className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      {data.title}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {data.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    )
  );
};

export default Result;
