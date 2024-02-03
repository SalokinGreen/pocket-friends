import React, { useState } from "react";
import styles from "./Main.module.css";
import Image from "next/image";
import Chip from "../UI/Chip";
import InfoCard from "./InfoCard";
import Modal from "../UI/Modal";
interface FriendProps {
  name: string;
  types: string[];
  location: string[];
  description: string;
  appearance: string;
  image: string;
  level: number;
  pocket: boolean;
  xp: number;
  stats: {
    hp: number;
    hpMax: number;
    attack: number;
    defense: number;
    speed: number;
  };
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
  const [open, setOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendProps | null>(
    null
  );

  const handleFriendClick = (friend: FriendProps) => {
    setSelectedFriend(friend);
    setOpen(true);
  };

  return (
    <div className={styles.friends}>
      {selectedFriend && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          size="small"
          title={selectedFriend.name}
        >
          <InfoCard {...selectedFriend} />
        </Modal>
      )}
      {friends.map((friend) => (
        <div
          className={styles.friendsItem}
          onClick={() => handleFriendClick(friend)}
        >
          <div className={styles.friendsItemImage}>
            <Image
              src={friend.image}
              alt={friend.name}
              width={165}
              height={165}
            />
          </div>
          <div className={styles.friendsItemHeader}>
            <div className={styles.friendsItemHead}>
              <h2>{friend.name}</h2>
              <p>{`lvl. ${friend.level}`}</p>
            </div>
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
