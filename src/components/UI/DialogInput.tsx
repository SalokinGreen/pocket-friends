import React, { useState, useRef, useEffect } from "react";
import styles from "./UI.module.css";
import Button from "./Button";
import Dialog from "./Dialog";
import Input from "./Input";

interface DialogInputProps {
  open: boolean;
  onClose: () => void;
  onSend: (value: string) => void;
  title: string;
  description: string;
}

export default function DialogInput({
  open,
  onClose,
  onSend,
  title,
  description,
}: DialogInputProps) {
  const [value, setValue] = useState("");
  const dialogRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  const handleSend = () => {
    onSend(value);
    setValue("");
    onClose();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className={styles.dialogInput}>
        <h2 className={styles.dialogInputTitle}>{title}</h2>
        <p className={styles.DialogInputDescription}>{description}</p>
        <Input
          placeholder="Type a message..."
          value={value}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setValue(e.target.value)
          }
          ref={dialogRef}
          handleEnter={handleEnter}
        />
        <div className={styles.dialogInputAction}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend}>Ok</Button>
        </div>
      </div>
    </Dialog>
  );
}
