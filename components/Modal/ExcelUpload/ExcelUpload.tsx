"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Modal from "../Modal";
import styles from "./ExcelUpload.module.scss";
import { cn } from "@/lib/utils";
import DoneSvg from "@/components/svg/done.svg";
import { postEmployeeList } from "@/services";
import { useSession } from "next-auth/react";
import { LoadingBalls } from "@/components/LoadingBalls";
import { useToast } from "@/components/ui/use-toast";

const ExcelUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const session = useSession();
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleUpload = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file!);

    postEmployeeList(session.data?.user.accessToken!, formData)
      .then(() => {
        setOpen(false);
        toast({
          duration: 3500,
          children: (
            <div className={styles.toastWrapper}>
              <div className={styles.icon}>
                <DoneSvg />
              </div>
              <p>اکسل با موفقیت بارگزاری شد</p>
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
      })
      .finally(() => setLoading(false));
  };
  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  return (
    <Modal
      FooterNode={
        <Button
          onClick={handleUpload}
          className={cn(
            styles.uploadBtn,
            (file === null || loading) && styles.disabled
          )}
          disabled={file === null || loading}
        >
          بارگذاری
        </Button>
      }
      title="لیست کارمندان"
      description="اکسل کارمندان را بارگذاری کنید"
      triggerText="بارگذاری لیست کارمندان (Excel)"
      className={styles.wrapper}
      triggerTextClassName={styles.triggerText}
      onOpenChange={() => setOpen((open) => !open)}
      open={open}
    >
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      {file === null ? (
        <Button onClick={handleButtonClick} className={styles.file}>
          انتخاب فایل (Excel)
        </Button>
      ) : (
        <div className={styles.fileName}>
          <div>{/* <DoneSvg width="50%" height="50%" /> */}</div>
          <span>{file.name}</span>
        </div>
      )}
    </Modal>
  );
};

export default ExcelUpload;
