import React from "react";
import styles from "./UI.module.css";

export default function Notifications({
  notifications,
  setNotifications,
}: {
  notifications: string[];
  setNotifications: (notifications: string[]) => void;
}) {
  const removeNotification = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  return (
    <div className={styles.notifications}>
      {notifications.map((notification, index) => (
        <div
          className={styles.notification}
          key={index}
          onClick={() => removeNotification(index)}
        >
          <p>{notification}</p>
        </div>
      ))}
    </div>
  );
}
