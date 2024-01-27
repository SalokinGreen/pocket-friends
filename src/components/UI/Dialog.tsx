import React, { useRef, useEffect, ReactNode } from "react";
import styles from "./UI.module.css";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Dialog({ open, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  const handleClickOutside = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className={styles.dialog}
      tabIndex={-1}
      ref={dialogRef}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
    >
      <div className={styles.dialogContent}>{children}</div>
    </div>
  );
}
