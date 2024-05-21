import styles from "./Modal.module.scss";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface IModalProps {
  triggerText: string;
  title: string;
  description?: string;
  children: ReactNode;
  FooterNode: ReactNode;
  className?: string;
  triggerTextClassName?: string;
  onOpenChange?: () => void;
  open?: boolean;
}

const Modal = ({
  triggerText,
  FooterNode,
  children,
  description,
  title,
  triggerTextClassName,
  onOpenChange,
  open,
}: IModalProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger className={triggerTextClassName}>
        {triggerText}
      </DialogTrigger>
      <DialogContent className={styles.wrapper}>
        <DialogHeader>
          <DialogTitle className={styles.title}>{title}</DialogTitle>
          {description && (
            <DialogDescription className={styles.description}>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className={styles.children}>{children}</div>
        <DialogFooter className={styles.footer}>{FooterNode}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
