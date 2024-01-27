import React, { ReactNode } from "react";
import styles from "./UI.module.css";

type DrawerProps = {
  position: string;
  children: ReactNode;
};

export default function Drawer({ position, children }: DrawerProps) {
  return (
    <div className={`${styles.drawer} ${styles[position]}`}>{children}</div>
  );
}
