import React from "react";
import styles from "./Main.module.css";
import Image from "next/image";

import { FaHeart, FaShieldAlt, FaBolt, FaFastForward } from "react-icons/fa";
import { BsFillFastForwardFill } from "react-icons/bs";

interface FriendProps {
  name: string;
  types: string[];
  location: string[];
  description: string;
  appearance: string;
  image: string;
  pocket: boolean;
  level: number;
  xp: number;
  stats: {
    hp: number;
    hpMax: number;
    attack: number;
    defense: number;
    speed: number;
  };
}
export default function InfoCard({
  friend,
  pocketClick,
}: {
  friend: FriendProps;
  pocketClick: (fried: FriendProps) => void;
}) {
  console.log;
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContent}>
        <div className={styles.infoHeader}>
          <div className={styles.infoImage}>
            <Image
              src={friend.image}
              alt={friend.name}
              width={255}
              height={255}
              onClick={() => pocketClick(friend)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <h1>
            {friend.name} {`(${friend.level})`}
          </h1>
        </div>
        <div className={styles.infoStats}>
          <div className={styles.infoStatRow}>
            <div className={styles.infoStat}>
              <FaHeart size={32} />
              <p>
                {Math.floor(friend.stats.hp)} / {Math.floor(friend.stats.hpMax)}
              </p>
            </div>
          </div>
          <div className={styles.infoStatRow}>
            <div className={styles.infoStat}>
              <FaShieldAlt size={32} />
              <p>{Math.floor(friend.stats.defense)}</p>
            </div>
            <div className={styles.infoStat}>
              <FaBolt size={32} />
              <p>{Math.floor(friend.stats.attack)}</p>
            </div>
            <div className={styles.infoStat}>
              <BsFillFastForwardFill size={32} />
              <p>{Math.floor(friend.stats.speed)}</p>
            </div>
          </div>
        </div>
        <div className={styles.infoText}>
          <div className={styles.infoStatRow}>
            <div className={styles.infoStat}>
              <h3>Types</h3>
              <p>{friend.types.join(", ")}</p>
            </div>
            <div className={styles.infoStat}>
              <h3>Location</h3>
              <p>{friend.location.join(", ")}</p>
            </div>
          </div>
          <h3>Description</h3>
          <p>{friend.description}</p>
          <h3>Appearance</h3>
          <p>{friend.appearance}</p>
        </div>
      </div>
    </div>
  );
}
