"use client";

import { Button } from "@/components/ui/button";
import Modal from "../Modal";
import styles from "./TestSend.module.scss";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { getExams, postCreateExam } from "@/services";
import { useSession } from "next-auth/react";
import { IEmployee } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import DoneSvg from "@/components/svg/done.svg";

const TestSend = ({
  selectedUsers,
  triggerText,
  triggreTextClassName,
}: {
  selectedUsers: IEmployee[];
  triggerText?: string;
  triggreTextClassName?: string;
}) => {
  const [tests, setTests] = useState<{ key: string; name: string }[]>([]);
  const session = useSession();
  const access = session.data?.user.accessToken!;
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      getExams(access).then((res) => setTests(res.results));
    }
  }, [open]);

  useEffect(() => {}, [tests]);

  const handleExamSend = () => {
    postCreateExam({
      token: access,
      body: {
        Exam: tests.map((test) => test.key),
        employee_id_list: selectedUsers.map((item) => +item.id) as number[],
      },
    }).then((res) => {
      setOpen(false);
      toast({
        duration: 3500,
        children: (
          <div className={styles.toastWrapper}>
            <div className={styles.icon}>
              <DoneSvg />
            </div>
            <p>
              {" "}
              {`آزمون ${res.title} با موفقیت به ${selectedUsers.length > 1 ? `${selectedUsers.length.toLocaleString("fa-IR")} نفر` : res.recipent} ارسال شد`}
            </p>
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
        <Button className={styles.uploadBtn} onClick={handleExamSend}>
          ارسال
        </Button>
      }
      title="انتخاب آزمون"
      triggerText={triggerText ? triggerText : "ارسال آزمون به کارمندان"}
      className={styles.wrapper}
      triggerTextClassName={
        triggreTextClassName ? triggreTextClassName : styles.triggerText
      }
      onOpenChange={() => setOpen((open) => !open)}
      open={open}
    >
      {tests.length > 0 ? (
        <ul className={styles.testsWrapper}>
          {tests.map((test) => (
            <li key={test.key} className={styles.testItem}>
              <Checkbox />
              <span>{test.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.testsWrapper}>
          {[...Array(3)].map((_, index) => (
            <li key={index} className={styles.testItem}>
              <Skeleton className={styles.square} />
              <Skeleton className={styles.rect} />
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default TestSend;
