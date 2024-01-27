import React, { useRef, useEffect } from "react";
import styles from "./UI.module.css";

interface PopUpProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  text: string;
  i: number;
}

export default function PopUP({ open, setOpen, title, text, i }: PopUpProps) {
  // click event listener
  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);
  // click event handler
  const handleClick = (e: MouseEvent) => {
    setOpen(false);
  };

  return (
    <div className={styles.popUp} key={i}>
      <div className={styles.popUpTitle}>{title}</div>
      <div className={styles.popUpText}>{text}</div>
    </div>
  );
}
