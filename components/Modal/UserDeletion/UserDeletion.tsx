"use client";

import { Button } from "@/components/ui/button";
import Modal from "../Modal";
import styles from "./UserDeletion.module.scss";
import { deleteEmployeeDetail } from "@/services";
import { useSession } from "next-auth/react";
import { IEmployee, IEmployeeList } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import DoneSvg from "@/components/svg/done.svg";
import { useStore } from "@/store";
import { Row, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const UserDeletion = ({
  row,
  table,
}: {
  row: Row<IEmployee>;
  table: Table<IEmployee>;
}) => {
  const session = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const tableRows = useStore((state) => state.tableRows);
  const setTableRows = useStore((state) => state.setTableRows);

  const deleteHandler = () => {
    deleteEmployeeDetail(
      session.data?.user.accessToken!,
      `${row.original.id}`
    ).then(() => {
      const deletedId = row.id;
      const updatedResults = table
        .getRowModel()
        .rows.filter((employee) => employee.id !== deletedId);

      const updatedTableRows: IEmployeeList = {
        results: updatedResults.map((item) => item.original),
        count: table.getRowCount() - 1,
        next: null,
        previous: null,
      };

      setTableRows(updatedTableRows);
      setOpen(false);
      toast({
        duration: 3500,
        children: (
          <div className={styles.toastWrapper}>
            <div className={styles.icon}>
              <DoneSvg />
            </div>
            <p></p>
          </div>
        ),
        style: {
          background: "#EAFFF0",
          borderColor: "#007132",
          borderRadius: "12px",
          borderWidth: "2px",
          color: "#007132",
        },
      });
    });
  };

  return (
    <Modal
      FooterNode={
        <div className={styles.footer}>
          <Button className={styles.delete} onClick={deleteHandler}>
            حذف
          </Button>
          <Button className={styles.cancel} onClick={() => setOpen(false)}>
            لغو
          </Button>
        </div>
      }
      title="حذف کاربر"
      triggerText="حذف کارمند"
      className={styles.wrapper}
      triggerTextClassName={styles.triggerText}
      onOpenChange={() => setOpen((open) => !open)}
      open={open}
    >{`${row.original.firstname}  ${row.original.lastname} حذف شود؟`}</Modal>
  );
};

export default UserDeletion;
