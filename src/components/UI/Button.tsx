import React, { MouseEventHandler } from "react";
import styles from "./UI.module.css";
const Button = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: string;
}) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
