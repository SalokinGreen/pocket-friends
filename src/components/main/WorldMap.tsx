"use client";
import React from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import Chip from "../UI/Chip";
interface LocationProps {
  name: string;
  types: string[];
  description: string;
  image: string;
  level: number;
}

export default function WorldMap({
  map,
  onClick,
}: {
  map: LocationProps[];
  onClick: (find: string) => void;
}) {
  return (
    <div className={styles.map}>
      <div className={styles.mapContainer}>
        <div className={styles.mapList}>
          {map.map((location) => (
            <div
              className={styles.mapItem}
              onClick={() => onClick(location.name)}
            >
              <div className={styles.mapItemImage}>
                <Image
                  src={location.image}
                  alt={location.name}
                  width={176}
                  height={176}
                />
              </div>
              <div className={styles.mapItemHeader}>
                <div className={styles.mapItemHead}>
                  <h2>{location.name}</h2>
                  <p>{`lvl. ${location.level}`}</p>
                </div>
                <div className={styles.mapItemTypes}>
                  {/* {location.types.map((type, key) => (
                    <Chip
                      key={key}
                      text={type}
                      click={() => console.log()}
                    ></Chip>
                  ))} */}
                </div>
                <p>{location.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
