import React, { ReactNode, MouseEventHandler } from "react";
import styles from "./UI.module.css";

type ExitProps = {
  onClick: () => void;
  children: ReactNode;
};

const Exit: React.FC<ExitProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.exit}>
      {children}
    </button>
  );
};

export default Exit;
