"use client";
import React, { useState } from "react";
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
}
const map: LocationProps[] = [...locations];
const fightContext = `⁂
Mailman vs Mad Dog
----
Name: Mailman
Type: normal
Location: suburbs
Description: The friendly mailman who always delivers your mail. He never misses, not even during a thunderstorm or a blizzard.
Appearance: Mailman, 1 man, friendly, nosy, white and blue uniform
----
Name: Mad Dog
Type: darkness
Location: slums
Description: This hound has gone mad and is looking for a fight. He's dangerous, but he's also got a lot of money in its pockets from his victims.
Appearance: Mad Dog, 1 dog, mutt, mean, strong, short tempered, sharp claws
***
Mailman attacks Mad Dog
Traits: weak attack, effective
Description: The mailman grabs a big package and smashes it over Mad Dog's head, stunning him for a few moments.
***
Mad Dog attacks Mailman
Traits: strong attack, ineffective
Description: The dog tears into the mailman, breaking his arm.
⁂
Grandpa vs Hobo
----
Name: Grandpa
Type: normal
Location: suburbs
Description: The old man with the silver mustache who loves kids. He loves to tell stories, but his memory has gotten better over the years, so he tells the same stories each day.
Appearance: Grandpa, 1 old man, clean, friendly, bushy silver mustache
----
Name: Hobo
Type: darkness
Location: slums
Description: A smelly bum who lives on the streets. They'll mug you if you don't watch out.
Appearance: Hobo, 1 man, dirty, poor, homeless, ugly, torn clothes
***
Grandpa attacks Hobo
Traits: average attack, effective
Description: Grandpa slowly walks over to Hobo and hits his private parts with his cane.
***
Hobo attacks Grandpa
Traits: weak attack, ineffective
Description: Hobo laughs at Grandpa before spitting in his eye.
⁂
Street Dealer vs Celeb Chef
----
Name: Street Dealer
Type: darkness
Location: slums
Description: Dealers have a reputation for being dangerous because they don't care who you are. They'll sell anything to anyone.
Appearance: Street Dealer, 1 woman, greedy, poor, heavy jewelry, expensive clothes, long earrings, loose skirt
----
Name: Celeb Chef
Type: famous
Location: gated community
Description: You may not have heard of the famed chef, but after one bite of his food, you won't ever forget him.
Appearance: Celeb Chef, 1 human, short, cute, white tuxedo, chefs hat, trim goatee
***
Celeb Chef attacks Street Dealer
Traits: strong attack, normal effect
Description: The Celeb Chef runs up and whacks the dealer's hand so she'll stop shaking so much.
***
Street Dealer attacks Celeb Chef
Traits: normal attack, effective
Description: The dealer grabs her bag of stuff, and jabs it into the chef. The contents break a few of his teeth.
⁂
`;
export default function Home() {
  const [foundFriend, setFoundFriend] = useState<FriendProps>({
    name: "",
    types: [],
    location: [],
    description: "",
    appearance: "",
    image: "",
  });
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const [pockets, setPockets] = useState<FriendProps[]>([]);
  const [friendFound, setFriendFound] = useState(false);
  const [tab, setTab] = useState(0);
  const generate = (context: string, friend: FriendProps) => {
    axios
      .post("/api/generate", {
        context: context,
        key: "",
        gens: 1,
        model: "kayra-v1",
      })
      .then((res) => {
        const result = res.data.results[0];
        //  get first line
        const name = result.split("\n")[0];
        // Get Description: line
        const description = result.split("Description:")[1].split("\n")[0];
        const appearance = result.split("Appearance:")[1].split("\n")[0];
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
          key: "",
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
    const search = map.find((item) => item.name === find);
    console.log(search);
    if (!search) return;

    const foundTypes: ClassProps[] = search?.types.map((type: string) => {
      return types[type];
    });
    console.log(foundTypes);
    const foundFriends = friendsIndex.filter((friend) => {
      return friend.types.some((type) => search.types.includes(type));
    });
    console.log(foundFriends);
    // get new data
    const newType =
      search.types[Math.floor(Math.random() * search.types.length)];
    setFoundFriend({
      name: "",
      types: [newType],
      location: [search.name.toLowerCase()],
      description: "",
      appearance: "",
      image: "",
    });

    const context = buildContext(
      `----
Pocket Friends
Pocket friends are creatures and people you can fight and catch.`,
      search,
      foundTypes,
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
      });
    });
  };
  const addFriend = () => {
    setFriends([...friends, foundFriend]);
    setFriendFound(false);
  };
  return (
    <main className={styles.main}>
      {friendFound && (
        <Modal
          isOpen={friendFound}
          onClose={() => setFriendFound(false)}
          size="small"
          title="Found a Pocket Friend!"
        >
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h1>{foundFriend.name}</h1>
              <p>{"(" + foundFriend.types.join("/") + ")"}</p>
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
              <Button onClick={() => addFriend()}>Befriend</Button>
            </div>
          </div>
        </Modal>
      )}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Button onClick={() => setTab(0)}>Map</Button>
          <Button onClick={() => setTab(1)}>Friends</Button>
          <Button onClick={() => setTab(2)}>Basement</Button>
        </div>
      </div>
      {tab === 0 && <WorldMap map={map} onClick={findPocketFriend} />}
      {tab === 1 && (
        <Friends
          friends={friends}
          setFriends={setFriends}
          pockets={pockets}
          setPockets={setPockets}
        />
      )}
    </main>
  );
}
