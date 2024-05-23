"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import styles from "./Analysis.module.scss";
import TestReport from "@/components/svg/test-report.svg";
import Link from "next/link";
import { IGetOrganizationExam } from "@/interfaces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store";
import { useEffect, useState } from "react";

export type TTests = Array<{
  id: string;
  title: string;
  participantsCount: number;
  employersTotalCount: number;
}>;

export type TCompanies = {
  id: string;
  title: string;
  tests?: TTests;
};

// export const organizationColumns: ColumnDef<IGetOrganizationExam>[] = [
//   {
//     accessorKey: "title",
//     header: "نام آزمون",
//   },
//   {
//     accessorKey: "departements.participants",
//     header: "تعداد شرکت‌کننده‌ها",
//     cell: ({ row }) => (
//       <span>
//         {selectedDepartment === "all"
//           ? row.original.departements.reduce(
//               (acc, curr) => acc + curr.participants,
//               0
//             )
//           : row.original.departements.find(
//               (dep) => dep.name === selectedDepartment
//             )?.participants}
//       </span>
//     ),
//   },
//   {
//     accessorKey: "departements.totalEmployees",
//     header: "تعداد کل کارمندان",
//     cell: ({ row }) => (
//       <span>
//         {selectedDepartment === "all"
//           ? row.original.departements.reduce(
//               (acc, curr) => acc + curr.totalEmployees,
//               0
//             )
//           : row.original.departements.find(
//               (dep) => dep.name === selectedDepartment
//             )?.totalEmployees}
//       </span>
//     ),
//   },

//   {
//     accessorKey: "actions",
//     header: "",
//     cell: ({ row }) => (
//       <div className={styles.actions}>
//         <Select>
//           <SelectTrigger className={styles.selectTrigger}>
//             <SelectValue placeholder="واحد سازمانی" />
//           </SelectTrigger>
//           <SelectContent
//             className={styles.selectContent}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//           >
//             {row.original.departements.map((item, index) => (
//               <SelectItem
//                 key={index}
//                 value={item.name === "" ? "all" : item.name}
//                 className={styles.selectItem}
//               >
//                 {item.name === "" ? "همه" : item.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Link
//           href={`analysis/${row.original}`}
//           className={styles.totalAnalysis}
//         >
//           <div>
//             <TestReport />
//           </div>
//           تحلیل کلی
//         </Link>
//       </div>
//     ),
//   },
// ];

export const organizationColumns: ColumnDef<IGetOrganizationExam>[] = [
  {
    accessorKey: "title",
    header: "نام آزمون",
  },
  {
    accessorKey: "departements.participants",
    header: "تعداد شرکت‌کننده‌ها",
    cell: ({ row }) => <TableValueCell type="participants" />,
  },
  {
    accessorKey: "departements.totalEmployees",
    header: "تعداد کل کارمندان",
    cell: ({ row }) => <TableValueCell type="total" />,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <TableActionCell row={row} />,
  },
];

export const TableActionCell = ({
  row,
}: {
  row: Row<IGetOrganizationExam>;
}) => {
  const setAnalysisItem = useStore((state) => state.setAnalysisItem);
  const analysisItem = useStore((state) => state.analysisItem);

  const [department, setDepartment] = useState<string>("");

  useEffect(() => {
    console.log(department, "departement");
    if (department === "all") {
      const selected = row.original.departements.find((row) => row.name === "");

      setAnalysisItem({
        department: department,
        participants: selected!.participants,
        totalEmployees: selected!.totalEmployees,
      });
    } else {
      const selected = row.original.departements.find(
        (row) => row.name === department
      );

      setAnalysisItem({
        department: department,
        participants: selected!.participants,
        totalEmployees: selected!.totalEmployees,
      });
    }
  }, [department]);

  return (
    <div className={styles.actions}>
      <Select onValueChange={(value) => setDepartment(value)}>
        <SelectTrigger className={styles.selectTrigger}>
          <SelectValue placeholder="واحد سازمانی" />
        </SelectTrigger>
        <SelectContent className={styles.selectContent}>
          {row.original.departements.map((item, index) => (
            <SelectItem
              key={index}
              value={item.name === "" ? "all" : item.name}
              className={styles.selectItem}
            >
              {item.name === "" ? "همه" : item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Link
        href={`analysis/${row.original.title}/${department === "" ? "all" : department}`}
        className={styles.totalAnalysis}
      >
        <div>
          <TestReport />
        </div>
        تحلیل کلی
      </Link>
    </div>
  );
};

export const TableValueCell = ({
  type,
}: {
  type: "total" | "participants";
}) => {
  const analysisItem = useStore((state) => state.analysisItem);
  useEffect(() => {}, [analysisItem]);

  return (
    <span>
      {type === "participants"
        ? analysisItem.participants.toLocaleString("fa-IR")
        : analysisItem.totalEmployees.toLocaleString("fa-IR")}
    </span>
  );
};
