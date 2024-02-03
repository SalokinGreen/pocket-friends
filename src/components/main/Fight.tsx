import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Image from "next/image";

import Menu from "../UI/Menu";
import MenuItem from "../UI/MenuItem";
import Button from "../UI/Button";
import axios from "axios";

import { types } from "@/data";
import Modal from "../UI/Modal";

import { FaHeart, FaShieldAlt, FaBolt, FaFastForward } from "react-icons/fa";
import { BsFillFastForwardFill } from "react-icons/bs";
import InfoCard from "./InfoCard";

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
⁂`;
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
enum Moves {
  none,
  attack,
  defend,
  special,
  win,
  lose,
}
enum SpecialMoves {
  heal,
  rage,
  sleep,
}
interface TurnProps {
  from: string;
  to: string;
  side: string;
  move: SpecialMoves;
}

export default function Fight({
  playerTeam,
  enemyTeam,
}: {
  playerTeam: FriendProps[];
  enemyTeam: FriendProps[];
}) {
  const [player, setPlayer] = useState<FriendProps[]>(playerTeam);
  const [enemy, setEnemy] = useState<FriendProps[]>(enemyTeam);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [playerSelected, setPlayerSelected] = useState<number>(0);
  const [enemySelected, setEnemySelected] = useState<number>(0);
  const [move, setMove] = useState<Moves>(Moves.attack);
  const [turn, setTurn] = useState<number>(0);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [header, setHeader] = useState<string>("Your Turn!");
  const [message, setMessage] = useState<string>("Do your best!");
  const [infoOn, setInfoOn] = useState<boolean>(false);
  const [infoSelf, setInfoSelf] = useState<boolean>(true);
  useEffect(() => {
    setPlayer(playerTeam);
    setEnemy(enemyTeam);
  }, [playerTeam, enemyTeam]);
  // useEffect(() => {
  //   if (playerTurn) {
  //     setHeader("YOUR TURN");
  //   } else {
  //     setHeader("ENEMY TURN");
  //   }
  // }, [playerTurn]);
  // useEffect(() => {
  //   if (move === Moves.attack) {
  //     if (playerTurn) {
  //       setMessage(
  //         `${player[playerSelected].name} attacks ${enemy[enemySelected].name}?`
  //       );
  //     } else {
  //       setMessage(`${enemy[enemySelected].name} attacks!`);
  //     }
  //   } else if (move === Moves.defend) {
  //     if (playerTurn) {
  //       setMessage(`${player[playerSelected].name} defends?`);
  //     } else {
  //       setMessage(`${enemy[enemySelected].name} defends!`);
  //     }
  //   } else if (move === Moves.special) {
  //     if (playerTurn) {
  //       setMessage(`${player[playerSelected].name} uses a special move?`);
  //     } else {
  //       setMessage(`${enemy[enemySelected].name} uses a special move!`);
  //     }
  //   }
  // }, [move, playerTurn, playerSelected, enemySelected]);
  const handleMove = (newMove: Moves) => {
    setMove(newMove);
    switch (newMove) {
      case Moves.attack:
        // attack
        setMessage(`${player[playerSelected].name} attacks!`);
        break;
      case Moves.defend:
        // defend
        setMessage(`${player[playerSelected].name} defends!`);
        break;
      case Moves.special:
        // special
        setMessage(`${player[playerSelected].name} uses a special move!`);
        break;
      default:
        break;
    }
  };

  const handlePlayerTurn = () => {
    setPlayerTurn(!playerTurn);
  };

  const handlePlayerSelected = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY - 300;
    setPosition({ x, y });
    setOpenMenu(true);
    setPlayerSelected(index);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleEnemySelected = (index: number) => {
    if (index === enemySelected) {
      handleInfo(false);
      return;
    }
    setEnemySelected(index);
    switch (move) {
      case Moves.attack:
        // attack
        setMessage(
          `${player[playerSelected].name} attacks ${enemy[enemySelected].name}?`
        );
        break;
      case Moves.defend:
        // defend

        break;
      case Moves.special:
        // special
        setMessage(
          `${player[playerSelected].name} uses a special move on ${enemy[enemySelected].name}?`
        );
        break;
      default:
        break;
    }
  };
  const generate = (context: string) => {
    console.log(context);
    let result = "";
    axios
      .post("/api/generate", {
        context: fightContext + "\n" + context,
        key: "NAIKEY",
        gens: 1,
        model: "kayra-v1",
      })
      .then((res) => {
        console.log(res.data);
        result = res.data.results[0].split("***")[0];
        setMessage(result);
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
  const handleNext = () => {
    const player = playerTeam[playerSelected];
    const enemy = enemyTeam[enemySelected];
    console.log(player, enemy);
    const playerContext = `----\nName: ${player.name}\nType: ${player.types[0]}\nLocation: ${player.location[0]}\nDescription: ${player.description}\nAppearance: ${player.appearance}`;
    const enemyContext = `----\nName: ${enemy.name}\nType: ${enemy.types[0]}\nLocation: ${enemy.location[0]}\nDescription: ${enemy.description}\nAppearance: ${enemy.appearance}`;
    if (playerTurn) {
      switch (move) {
        case Moves.attack:
          // attack
          const damage = calculateDamage(player, enemy);
          const level = getDamageLevel(damage, enemy.stats.hpMax);
          console.log(damage);
          console.log(damage);
          let effect = "";
          switch (getEffectiveness(player, enemy)) {
            case 2:
              effect = ", effective";
              break;
            case 0.5:
              effect = ", ineffective";
              break;
            default:
              break;
          }

          setHeader(`${player.name} attacks ${enemy.name}!`);
          setMessage("Generating...");
          generate(
            player.name +
              " vs " +
              enemy.name +
              "\n" +
              playerContext +
              "\n" +
              enemyContext +
              "\n***\n" +
              player.name +
              " attacks " +
              enemy.name +
              "\nTraits: " +
              `${level}${effect}` +
              "\nDescription:"
          );
          enemyTeam[enemySelected].stats.hp -= damage;
          break;
        case Moves.defend:
          // defend
          break;
        case Moves.special:
          // special
          break;
        default:
          break;
      }
      setPlayerTurn(false);
    } else {
      const damage = calculateDamage(enemy, player);
      const level = getDamageLevel(damage, player.stats.hpMax);
      console.log(damage);
      let effect = "";
      switch (getEffectiveness(enemy, player)) {
        case 2:
          effect = ", effective";
          break;
        case 0.5:
          effect = ", ineffective";
          break;
        default:
          break;
      }
      setHeader(`${enemy.name} attacks ${player.name}!`);
      setMessage("Generating...");
      generate(
        enemy.name +
          " vs " +
          player.name +
          "\n" +
          enemyContext +
          "\n" +
          playerContext +
          "\n***\n" +
          enemy.name +
          " attacks " +
          player.name +
          "\nTraits: " +
          `${level}${effect}` +
          "\nDescription:"
      );
      playerTeam[playerSelected].stats.hp -= damage;

      setPlayerTurn(true);
    }
  };
  const calculateDamage = (attacker: FriendProps, defender: FriendProps) => {
    const roll = Math.floor(Math.random() * 100);
    let crit = false;
    if (roll > 90 + (defender.level - attacker.level)) {
      crit = true;
    }
    const random = Math.floor(Math.random() * 10);
    let damage =
      (attacker.stats.attack / defender.stats.defense) *
      random *
      getEffectiveness(attacker, defender);
    if (damage < 0) {
      return 1;
    } else if (crit) {
      return damage * 2;
    } else {
      return damage;
    }
  };
  const getEffectiveness = (attacker: FriendProps, defender: FriendProps) => {
    let effectiveness = 1;
    if (types[attacker.types[0]].strong.includes(defender.types[0])) {
      effectiveness = 2;
    } else if (types[attacker.types[0]].weak.includes(defender.types[0])) {
      effectiveness = 0.5;
    }
    return effectiveness;
  };
  const getDamageLevel = (damage: number, maxHp: number) => {
    if (damage < maxHp * 0.1) {
      return "weak attack";
    } else if (damage > maxHp * 0.8) {
      return "critical attack";
    } else {
      return "strong attack";
    }
  };
  const handleInfo = (self: boolean, place?: number) => {
    setInfoOn(true);
    setInfoSelf(self);
    setOpenMenu(false);
  };
  return (
    <div className={styles.fightContainer}>
      <div className={styles.enemyRow}>
        {enemy.map((enemy, index) => (
          <div
            className={styles.enemy}
            onClick={() => handleEnemySelected(index)}
          >
            <Image
              src={enemy.image}
              alt={enemy.name}
              width={176}
              height={176}
            />
            <div className={styles.info}>
              <h2>{enemy.name}</h2>
              <p>{`lvl. ${enemy.level}`}</p>
              <div className={styles.life}>
                <div className={styles.lifeBar}>
                  <div
                    className={
                      (enemy.stats.hp / enemy.stats.hpMax) * 100 > 50
                        ? styles.lifeBarFillHealthy
                        : styles.lifeBarFillDangerous
                    }
                    style={{
                      width: `${
                        (enemy.stats.hp / enemy.stats.hpMax) * 100 || 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.fight}>
        <div className={styles.fightHeader}>
          <h2>{header}</h2>
        </div>
        <div className={styles.fightMessage}>
          <p>{message}</p>
        </div>
        <div className={styles.fightAction}>
          <Button onClick={() => handleNext()}>Next</Button>
        </div>
      </div>
      <div className={styles.playerRow}>
        {player.map((player, index) => (
          <div
            className={styles.player}
            onClick={(e) => handlePlayerSelected(e, index)}
          >
            <Image
              src={player.image}
              alt={player.name}
              width={176}
              height={176}
            />
            <div className={styles.info}>
              <h2>{player.name}</h2>
              <p>{`lvl. ${player.level}`}</p>
              <div className={styles.life}>
                <div className={styles.lifeBar}>
                  <div
                    className={
                      (player.stats.hp / player.stats.hpMax) * 100 > 50
                        ? styles.lifeBarFillHealthy
                        : styles.lifeBarFillDangerous
                    }
                    style={{
                      width: `${
                        (player.stats.hp / player.stats.hpMax) * 100 || 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {infoOn && (
        <Modal onClose={() => setInfoOn(false)} size="small" isOpen={infoOn}>
          <InfoCard
            {...(infoSelf ? player[playerSelected] : enemy[enemySelected])}
          />
        </Modal>
      )}
      {openMenu && (
        <Menu position={position} onClose={handleCloseMenu}>
          <MenuItem onClick={() => handleMove(Moves.attack)}>Attack</MenuItem>
          <MenuItem onClick={() => handleMove(Moves.defend)}>Defend</MenuItem>
          <MenuItem onClick={() => handleMove(Moves.special)}>Special</MenuItem>
          <MenuItem onClick={() => console.log("e")}>Use Item</MenuItem>
          <MenuItem onClick={() => handleInfo(true)}>Info</MenuItem>
        </Menu>
      )}
    </div>
  );
}
