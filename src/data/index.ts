interface FriendProps {
  name: string;
  types: string[];
  location: string[];
  description: string;
  appearance: string;
}
export const friendsIndex: FriendProps[] = [
  {
    name: "Hobo",
    types: ["darkness"],
    location: ["slums"],
    description:
      "A smelly bum who lives on the streets. They'll mug you if you don't watch out.",
    appearance: "Hobo, 1 man, dirty, poor, homeless, ugly, torn clothes",
  },
  {
    name: "Mad Dog",
    types: ["darkness"],
    location: ["slums"],
    description:
      "This hound has gone mad and is looking for a fight. He's dangerous, but he's also got a lot of money in its pockets from his victims.",
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
];
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
      "Dangerous and dark pocket friends. They can be criminals, monsters, or people with issues.",
  },
  normal: {
    name: "normal",
    strong: ["darkness", "famous"],
    weak: ["darkness", "famous"],
    description:
      "Mundane people and creatures. They can be moody teenagers, animals like dogs, a milkman, and other normal things.",
  },
  famous: {
    name: "famous",
    weak: ["darkness"],
    strong: ["normal"],
    description:
      "More posh pocket people. Good aligned leaders, artists, sports-folk, and the rich.",
  },
  nature: {
    name: "nature",
    strong: ["darkness"],
    weak: ["normal"],
    description:
      "Nature was the first to exist, and it kept its place forever. Animals, plants, and forces of nature.",
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
    description: "The slums has low level criminals and poor people.",
    types: ["darkness", "normal"],
    image: "/locations/slums.png",
    level: 1,
  },
  {
    name: "Suburbs",
    description:
      "The suburbs contain middling citizens of decent morality living mundane lives. Your average people.",
    types: ["normal"],
    image: "/locations/suburbs.png",
    level: 1,
  },
  {
    name: "Gated Community",
    image: "/locations/gated community.png",
    level: 2,
    description:
      "Gated Communities have a lot of rich people, celebrities, and different ways to protect them.",
    types: ["normal", "famous"],
  },
  {
    name: "Forest",
    image: "/locations/forest.png",
    level: 2,
    description: "A lot of plants, animals, and occasional nature lovers.",
    types: ["nature"],
  },
  {
    name: "The Mushroom Kingdom",
    image: "/locations/mushroom kingdom.png",
    level: 50,
    description:
      "This location has a lot of mushrooms and magic, and is ruled by Princess Peach. The Mario brothers are very popular there.",
    types: ["normal", "darkness", "famous"],
  },
];
