import React, { ReactNode, MouseEventHandler } from "react";
import styles from "./UI.module.css";

interface MenuItemProps {
  onClick: MouseEventHandler;
  children: ReactNode;
}

// Context Menu Item
const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className={styles.menuItem}>
      {children}
    </div>
  );
};

export default MenuItem;
