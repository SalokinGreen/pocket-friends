interface FriendProps {
  name: string;
  types: string[];
  location: string[];
  description: string;
  appearance: string;
  pocket?: boolean;
  level?: number;
}
export const friendsIndex: FriendProps[] = [
  {
    name: "Hobo",
    types: ["darkness"],
    location: ["slums"],
    description:
      "This guy looks like he hasn't eaten anything in weeks. He smells like something died on him too.",
    appearance:
      "Hobo, 1 man, dirty, poor, homeless, ugly, torn clothes, stinks",
  },
  {
    name: "Mad Dog",
    types: ["darkness"],
    location: ["slums"],
    description:
      "He has gone mad and is looking for a fight. He's dangerous, but he's also got a lot of money in its pockets from his victims.",
    appearance:
      "Mad Dog, 1 dog, mutt, mean, strong, short tempered, sharp claws",
  },
  {
    name: "Mailman",
    types: ["normal"],
    location: ["suburbs"],
    description:
      "The friendly mailman who always delivers your mail. He never misses, not even during a thunderstorm or a blizzard.",
    appearance: "Mailman, 1 man, friendly, nosy, white and blue uniform",
  },
  {
    name: "Grandpa",
    types: ["normal"],
    location: ["suburbs"],
    description:
      "The old man with the silver mustache who loves kids. He loves to tell stories, but his memory has gotten better over the years, so he tells the same stories each day.",
    appearance: "Grandpa, 1 old man, clean, friendly, bushy silver mustache",
  },
  {
    name: "Celeb Chef",
    types: ["famous"],
    location: ["gated community"],
    description:
      "You may not have heard of the famed chef, but after one bite of his food, you won't ever forget him.",
    appearance:
      "Celeb Chef, 1 human, short, cute, white tuxedo, chefs hat, trim goatee",
  },
  {
    name: "Weather Girl",
    types: ["famous"],
    location: ["gated community"],
    description:
      "She might seem simple at first glance, but she's actually smarter than most and knows what's going on in this little world of ours. She'll make the perfect sidekick for your adventures.",
    appearance:
      "Weather Girl, 1 human woman, blonde, curly hair, glasses, lipstick",
  },
  {
    name: "Eagle Scout",
    types: ["nature"],
    location: ["forest"],
    description:
      "She may be just an eagle scout, but she can shoot an arrow as far as your imagination can dream.",
    appearance:
      "Eagle Scout, 1 girl, white shirt and hat with red 'S,' shoulder pad and pants",
  },
  {
    name: "Bear",
    types: ["nature"],
    location: ["forest"],
    description:
      "This bear lives in the woods, where it hibernates, eats, and plays with the local kids. He doesn't speak, but don't get fooled. He will eat you alive if you give him reasons to.",
    appearance: "Bear, tall, dangerous, hungry, heavy paws, wild mane",
  },
  {
    name: "Nerd",
    types: ["lame"],
    location: ["high-school"],
    description:
      "A nerdy student who can be found reading in the library or in the computer room. She's often very knowledgeable, but not very popular.",
    appearance:
      "Nerd, 1 girl, tall, thin, glasses, pocket protector, blue jeans, long sleeve shirt",
  },
  {
    name: "Geek",
    types: ["lame"],
    location: ["high-school"],
    description:
      "This guy is the geekiest of all nerds. He has no life, no friends, and spends all his free time playing video games.",
    appearance: "Geek, 1 boy, short, bad skin, bad teeth, gamer",
  },
  {
    name: "Naked Hippy",
    types: ["silly"],
    location: ["forest"],
    description:
      "He doesn't care what others think and lives by his own rules. He's naked all the time, but he also has a heart of gold and will help anyone who needs it.",
    appearance: "Naked Hippy, 1 man, no clothes, happy, barefoot, long beard",
  },
  {
    name: "Class Clown",
    types: ["silly"],
    location: ["high-school"],
    description:
      "The class clown who's always cracking jokes. No matter what you're doing, he'll find something funny about it.",
    appearance:
      "Class Clown, 1 boy, red hair, freckles, funny t-shirt, jeans, sneakers",
  },
  {
    name: "Rat King",
    types: ["legendary"],
    location: ["sewers"],
    description:
      "The Rat King is a giant rat, whose family is the biggest and most dangerous rat family in the sewers. They will stop at nothing to get what they want, and that includes stealing your food and clothes.",
    appearance: "Rat King, 1 rat, big, fat, short fur, long tail, strong",
  },
  {
    name: "Magical Pixie",
    types: ["legendary"],
    location: ["forest"],
    description:
      "This beautiful fairy will follow you wherever you go, but only if she likes you. She has magical powers and can heal any wound, but she also has a mischievous side.",
    appearance:
      "Magical Pixie, small, 1 girl, tiny wings, colorful clothes, pixie dust, hair of many colors",
  },
];
enum FriendType {
  normal = "normal",
  darkness = "darkness",
  famous = "famous",
  lame = "lame",
  legendary = "legendary",
}

interface ClassProps {
  name: string;
  strong: string[];
  weak: string[];
  description: string;
}
interface ClassObject {
  [key: string]: ClassProps;
}
export const types: ClassObject = {
  darkness: {
    name: "darkness",
    strong: ["darkness", "normal"],
    weak: ["famous"],
    description:
      "Dangerous and shady pocket friends. Not many want to be friends with them and most are scared of them, but they're the kind of friends who would do anything for you.",
  },
  normal: {
    name: "normal",
    strong: ["darkness", "famous"],
    weak: ["darkness", "famous"],
    description:
      "Your average pocket friend. They can be smart, cool, funny, or whatever else you want to be. They're good friends to have, as they're normal and easy to talk to.",
  },
  famous: {
    name: "famous",
    weak: ["darkness"],
    strong: ["normal"],
    description:
      "They're the shiny pocket friends; the rich and famous ones. The kind who get the red carpet treatment wherever they go, even when they just wanna get a hamburger. They're not really good or bad friends, just know they're popular.",
  },
  // nature: {
  //   name: "nature",
  //   strong: ["darkness"],
  //   weak: ["normal"],
  //   description:
  //     "All the animals, plants, nature enthusiasts, and similar pocket friends related to nature. These friends have an amazing connection with nature and a strong will to protect it.",
  // },
  lame: {
    name: "lame",
    strong: ["normal"],
    weak: ["darkness", "famous"],
    description:
      "This kind of pocket friends are nerdy, awkward, clumsy, and more. They're not the most popular, but they're always great at talking about their passions. They may not have many friends, but that makes you just more valuable to them.",
  },
  silly: {
    name: "silly",
    strong: ["darkness"],
    weak: ["legendary"],
    description:
      "Pocket friends that are fun to hang around with. They might not be the brightest or the most serious, but they know how to put a smile on your face. Fun, ridiculous, hilarious, and more are the words you'll think of when you meet silly pocket friends.",
  },
  legendary: {
    name: "legendary",
    strong: ["darkness"],
    weak: ["normal"],
    description:
      "Everyone wants a legendary pocket friend; everyone is dreaming of getting one. They're special, nothing like normal pocket friends. They're unique, powerful, and not to be messed with, while always having your back.",
  },
};
interface LocationProps {
  name: string;
  types: string[];
  description: string;
  image: string;
  level: number;
}
export const locations: LocationProps[] = [
  {
    name: "Slums",
    description:
      "You don't want to walk around here any time, but nights are the worst.  Criminals, scum, and worse are roaming the streets. Not everyone is bad, some unfortunate people live here too, like hobos and junkies.",
    types: ["darkness", "normal"],
    image: "/locations/slums.png",
    level: 1,
  },
  {
    name: "Suburbs",
    description:
      "The suburbs are a nice area where good people live. This place has everything you could want, shops, arcades, restaurants and much more, but they're also rather boring.",
    types: ["normal"],
    image: "/locations/suburbs.png",
    level: 1,
  },
  {
    name: "Gated Community",
    image: "/locations/gated community.png",
    level: 2,
    description:
      "A very expensive place, mostly for the rich to live in luxury and security, but even some b-stars are known to live here. A private military is making sure things don't get out of hand here, and they rich also paid for other ways to be secure.",
    types: ["normal", "famous"],
  },
  {
    name: "Forest",
    image: "/locations/forest.png",
    level: 2,
    description:
      "A massive forest with trees so high, you can't see the tops from the ground. Creatures of all kinds live here, and you'll never know what you might bump into.",
    types: ["silly", "legendary"],
  },
  {
    name: "High-School",
    image: "/locations/high-school.png",
    level: 3,
    description:
      "This is the place of jocks, nerds, geeks, bullies, misfits, and more. The school staff also makes for great friends, but they're often more boring.",
    types: ["normal", "lame", "silly"],
  },
  // {
  //   name: "The Mushroom Kingdom",
  //   image: "/locations/mushroom kingdom.png",
  //   level: 50,
  //   description:
  //     "This location has a lot of mushrooms and magic, and is ruled by Princess Peach. The Mario brothers are very popular there.",
  //   types: ["normal", "darkness", "famous"],
  // },
  {
    name: "Sewers",
    image: "/locations/sewers.png",
    level: 3,
    description:
      "The sewers are a disgusting place, but it's the perfect home for disgusting creatures. Monsters made their nests here and traps are everywhere, so keep your wits about you.",
    types: ["darkness", "legendary"],
  },
];
