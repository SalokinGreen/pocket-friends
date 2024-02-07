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
enum Params {
  pro = "pro",
  insani = "insani",
  chk = "chk",
  daemon = "daemon",
}
interface SettingsProps {
  level: number;
  pocketSpace: number;
  money: number;
  items: string[];
  parameters: Params;
}
export default function Friends({
  friends,
  setFriends,
  pockets,
  setPockets,
  settings,
  addMessage,
}: {
  friends: FriendProps[];
  setFriends: (friends: FriendProps[]) => void;
  pockets: FriendProps[];
  setPockets: (pockets: FriendProps[]) => void;
  settings: SettingsProps;
  addMessage: (message: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendProps | null>(
    null
  );

  const handleFriendClick = (friend: FriendProps) => {
    setSelectedFriend(friend);
    setOpen(true);
  };
  const handlePockeClick = (friend: FriendProps) => {
    if (friend.pocket) {
      friend.pocket = false;
      setFriends(friends.map((f) => (f === friend ? friend : f)));
      addMessage(`${friend.name} removed from your pockets!`);
    } else {
      const pocket = friends.filter((f) => f.pocket);
      if (pocket.length < settings.pocketSpace) {
        friend.pocket = true;
        setFriends(friends.map((f) => (f.name === friend.name ? friend : f)));
        setPockets([...pockets, friend]);
        addMessage(`${friend.name} added to your pockets!`);
      } else {
        addMessage("No more space in your pockets!");
      }
    }
  };
  return (
    <div className={styles.friends}>
      {open && selectedFriend && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          size="small"
          title={selectedFriend.pocket ? "Pocket Friend" : "Friend"}
        >
          <InfoCard friend={selectedFriend} pocketClick={handlePockeClick} />
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
              <p>{`${friend.level}`}</p>
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
