"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/UI/Button";
import axios from "axios";
import WorldMap from "@/components/main/WorldMap";
import { locations, types, friendsIndex } from "@/data";
import buildContext from "@/utils/front/buildContext";
import Modal from "@/components/UI/Modal";
import JSZip from "jszip";
import Friends from "@/components/main/Friends";
import Notifications from "@/components/UI/Notifications";
import Fight from "@/components/main/Fight";
interface LocationProps {
  name: string;
  types: string[];
  description: string;
  image: string;
  level: number;
}
interface ClassProps {
  name: string;
  strong: string[];
  weak: string[];
  description: string;
}
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
const map: LocationProps[] = [...locations];
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
export default function Home() {
  const [foundFriend, setFoundFriend] = useState<FriendProps>({
    name: "",
    types: [],
    location: [],
    description: "",
    appearance: "",
    image: "",
    pocket: false,
    level: 1,
    xp: 0,
    stats: {
      hp: 0,
      hpMax: 0,
      attack: 0,
      defense: 0,
      speed: 0,
    },
  });
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const [pockets, setPockets] = useState<FriendProps[]>([]);
  const [monsters, setMonsters] = useState<FriendProps[]>([]);
  const [friendFound, setFriendFound] = useState(false);
  const [tab, setTab] = useState(0);
  const [playerStats, setPlayerStats] = useState<SettingsProps>({
    level: 1,
    pocketSpace: 1,
    money: 0,
    items: [],
    parameters: Params.daemon,
  });
  const [notifications, setNotifications] = useState<string[]>([]);
  useEffect(() => {
    if (notifications.length > 5) {
      const newNotifications = [...notifications];
      const remove = notifications.length - 5;
      newNotifications.splice(0, remove);
      setNotifications(newNotifications);
    }
  }, [notifications]);
  useEffect(() => {
    if (monsters.length <= 0 && tab === 2) {
      setTab(1);
    }
  }, [monsters]);
  const generate = (context: string, friend: FriendProps) => {
    axios
      .post("/api/generate", {
        context: context,
        key: "NAIKEY",
        gens: 1,
        model: "kayra-v1",
        parameters: playerStats.parameters,
      })
      .then((res) => {
        const result = res.data.results[0];
        //  get first line and remove space at the start
        const name = result.split("\n")[0].trim();
        // Get Description: line
        const description = result
          .split("Description:")[1]
          .split("\n")[0]
          .trim();
        const appearance = result.split("Appearance:")[1].split("\n")[0].trim();
        console.log(name, description, appearance);
        setFoundFriend({
          ...friend,
          name: name,
          description: description,
          appearance: appearance,
        });
        generateImage(appearance, {
          ...friend,
          name: name,
          description: description,
          appearance: appearance,
          stats: generateStats(friend.types, friend.level),
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  const generateImage = (prompt: string, friend: FriendProps) => {
    axios
      .post(
        "/api/generateImage",
        {
          prompt: prompt,
          key: "NAIKEY",
        }
        // { responseType: "blob" }
      )
      .then((res) => {
        console.log(res);
        const image = res.data.image;
        // image is base64 encoded
        const url = `data:image/png;base64,${image}`;

        setFoundFriend({ ...friend, image: url });
        setFriendFound(true);
      });
  };
  const findPocketFriend = (find: string) => {
    const search = map.find((location) => location.name === find);
    console.log(search);
    if (!search) return;
    notifications.push(`You're searching for more pocket friends!`);

    const foundTypes: ClassProps[] = search?.types.map((type: string) => {
      return types[type];
    });
    console.log(foundTypes);
    const newType = getType(search.level);

    const foundFriends = friendsIndex.filter((friend) => {
      // return friend.types.some((type) => search.types.includes(type));
      return friend.types.includes(newType);
    });
    console.log(foundFriends);
    // get new data

    const context = buildContext(
      `----
Pocket Friends
Pocket friends are creatures and people you can fight and catch. All the pocket friends have special abilities and talents tailored to whom they are.`,
      search,
      [types[newType]],
      foundFriends,
      8000,
      `----\nType: ${newType}\nLocation: ${search.name.toLowerCase()}\nName:`
    ).then((res: any) => {
      console.log(res);
      const result = generate(res, {
        name: "",
        types: [newType],
        location: [search.name.toLowerCase()],
        description: "",
        appearance: "",
        image: "",
        level: friendLevel(search.level),
        pocket: pocketSpace(),
        xp: 0,
        stats: {
          hp: 0,
          hpMax: 0,
          attack: 0,
          defense: 0,
          speed: 0,
        },
      });
    });
  };
  const friendLevel = (locationLevel: number) => {
    // Level from 1 to 100. The higher the location level, the higher possible friend level
    let level = 1;
    let chance = Math.floor(Math.random() * 100);
    if (chance === 100) {
      level = locationLevel + Math.floor(Math.random() * 10);
    } else if (chance === 0) {
      level = locationLevel - Math.floor(Math.random() * 10);
    } else if (chance > 50) {
      level = locationLevel + Math.floor(Math.random() * 5);
    } else {
      level = locationLevel - Math.floor(Math.random() * 5);
    }
    if (level <= 0) level = 1;
    if (level >= 100) level = 100;
    console.log(level);
    return level;
  };
  const pocketSpace = () => {
    // Check if player has place in pocket
    const pocketSpace = playerStats.pocketSpace;
    const pocketFriends = friends.filter((friend) => friend.pocket);
    if (pocketFriends.length >= pocketSpace) return false;
    return true;
  };

  const addFriend = (newFriend: FriendProps) => {
    setFriends([...friends, newFriend]);
    setMonsters(monsters.filter((monster) => monster !== newFriend));
    setFriendFound(false);
    setNotifications([
      ...notifications,
      `You've befriended ${newFriend.name}!`,
    ]);
  };
  const generateStats = (types: string[], level?: number) => {
    let stats = {
      hp: 0,
      hpMax: 0,
      attack: 0,
      defense: 0,
      speed: 0,
    };
    if (!level) level = 1;
    stats.hp = Math.floor(Math.random() * 10) + 5 * level;
    stats.attack = Math.floor(Math.random() * 5) + 2 * level;
    stats.defense = Math.floor(Math.random() * 5) + 2 * level;
    stats.speed = Math.floor(Math.random() * 5) + 2 * level;
    types.forEach((type) => {
      switch (type) {
        case "normal":
          stats.hp *= 1.1;
          break;
        case "silly":
          stats.defense *= 1.1;
          break;
        case "darkness":
          stats.attack *= 1.1;
          break;
        case "lame":
          stats.speed *= 1.1;
          break;
        case "famous":
          stats.hp *= 1.05;
          stats.defense *= 1.05;
          break;
        case "legendary":
          stats.hp *= 1.25;
          stats.attack *= 1.25;
          stats.defense *= 1.25;
          stats.speed *= 1.25;
          break;
        default:
          break;
      }
    });
    stats.hpMax = stats.hp;
    console.log(stats);
    return stats;
  };
  /**
   * Get type of friend. The higher the location level and player level, the higher the chance of getting a legendary friend.
   * @param locationLevel
   * @returns
   */
  const getType = (locationLevel: number) => {
    let possibleTypes = Object.keys(types);
    // remove legendary
    possibleTypes = possibleTypes.filter((type) => type !== "legendary");
    const chance = playerStats.level + locationLevel;
    const roll = Math.floor(Math.random() * 500);
    if (roll <= chance) {
      return "legendary";
    } else {
      return possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
    }
  };
  const battleFriend = () => {
    if (friends.length <= 0) {
      addFriend(foundFriend);
      return;
    }
    setMonsters([...monsters, foundFriend]);
    setTab(2);
    setFriendFound(false);
  };
  const addMessage = (message: string) => {
    setNotifications([...notifications, message]);
  };
  return (
    <main className={styles.main}>
      <Notifications
        notifications={notifications}
        setNotifications={setNotifications}
      />
      {friendFound && (
        <Modal
          isOpen={friendFound}
          // onClose={() => setFriendFound(false)}
          onClose={() => console.log("close")}
          size="small"
          title="Found a Pocket Friend!"
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h1>{foundFriend.name}</h1>
              <p>
                {"(" +
                  foundFriend.types.join("/") +
                  ")" +
                  "\n" +
                  `${foundFriend.level}`}
              </p>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalImage}>
                <Image
                  src={foundFriend.image}
                  alt={foundFriend.name}
                  width={255}
                  height={255}
                />
              </div>
              <div className={styles.modalDescription}>
                <p>{foundFriend.description}</p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <Button onClick={() => battleFriend()}>Befriend</Button>
              <Button onClick={() => setFriendFound(false)}>Ghost</Button>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Button onClick={() => setTab(0)}>Map</Button>
          <Button onClick={() => setTab(1)}>Friends</Button>
          <Button onClick={() => setTab(2)}>Basement</Button>
          <Button onClick={() => setTab(3)}>Your Mom's Kitchen</Button>
          <Button onClick={() => setTab(4)}>Settings</Button>
        </div>
      </div>
      {tab === 0 && <WorldMap map={map} onClick={findPocketFriend} />}
      {tab === 1 && (
        <Friends
          friends={friends}
          setFriends={setFriends}
          pockets={pockets}
          setPockets={setPockets}
          settings={playerStats}
          addMessage={addMessage}
        />
      )}
      {tab === 2 && (
        <Fight
          playerTeam={friends.filter((friend) => friend.pocket)}
          enemyTeam={monsters}
          settings={playerStats}
          addFriend={addFriend}
        />
      )}
    </main>
  );
}
