import React from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import Chip from "../UI/Chip";
interface FriendProps {
  name: string;
  types: string[];
  location: string[];
  description: string;
  appearance: string;
  image: string;
}
export default function Friends({
  friends,
  setFriends,
  pockets,
  setPockets,
}: {
  friends: FriendProps[];
  setFriends: (friends: FriendProps[]) => void;
  pockets: FriendProps[];
  setPockets: (pockets: FriendProps[]) => void;
}) {
  return (
    <div className={styles.friends}>
      {friends.map((friend) => (
        <div className={styles.friendsItem}>
          <div className={styles.friendsItemImage}>
            <Image
              src={friend.image}
              alt={friend.name}
              width={165}
              height={165}
            />
          </div>
          <div className={styles.friendsItemHeader}>
            <h2>{friend.name}</h2>
            <div className={styles.friendsItemTypes}>
              {friend.types.map((type, key) => (
                <Chip key={key} text={type} click={() => console.log()} />
              ))}
            </div>
            <p>{friend.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
