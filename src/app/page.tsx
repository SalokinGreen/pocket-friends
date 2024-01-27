"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/UI/Button";

export default function Home() {
  const handleClick = () => {
    console.log("Hello");
  };
  return (
    <main className={styles.main}>
      <Button onClick={handleClick}>Hello</Button>
    </main>
  );
}
