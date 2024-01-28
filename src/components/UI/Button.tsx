import React, { MouseEventHandler, ReactNode } from "react";
import styles from "./UI.module.css";
const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
