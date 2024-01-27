import React, { useRef, useEffect, ReactNode } from "react";
import styles from "./UI.module.css";

type MenuProps = {
  children: ReactNode;
  position: { x: number; y: number };
  onClose: () => void;
};

export default function Menu({ children, position, onClose }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [onClose]);

  return (
    <div
      className={`${styles.menu}`}
      ref={menuRef}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div className={styles.menuContent}>{children}</div>
    </div>
  );
}
