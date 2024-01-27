export const friendsIndex = [
  {
    name: "Hobo",
    type: ["darkness"],
    location: ["slums"],
    description:
      "A smelly bum who lives on the streets. They'll mug you if you don't watch out.",
    appearance: "Hobo, 1 man, dirty, poor, homeless, ugly, torn clothes",
  },
  {
    name: "Mad Dog",
    type: ["darkness"],
    location: ["slums"],
    description:
      "This hound has gone mad and is looking for a fight. He's dangerous, but he's also got a lot of money in its pockets from his victims.",
    appearance:
      "Mad Dog, 1 dog, mutt, mean, strong, short tempered, sharp claws",
  },
  {
    name: "Mailman",
    type: ["normal"],
    location: ["suburbs"],
    description:
      "The friendly mailman who always delivers your mail. He never misses, not even during a thunderstorm or a blizzard.",
    appearance: "Mailman, 1 man, friendly, nosy, white and blue uniform",
  },
  {
    name: "Grandpa",
    type: ["normal"],
    description:
      "The old man with the silver mustache who loves kids. He loves to tell stories, but his memory has gotten better over the years, so he tells the same stories each day.",
    appearance: "Grandpa, 1 old man, clean, friendly, bushy silver mustache",
  },
  {
    name: "Celeb Chef",
    type: ["famous"],
    description:
      "You may not have heard of the famed chef, but after one bite of his food, you won't ever forget him.",
    appearance:
      "Celeb Chef, 1 human, short, cute, white tuxedo, chefs hat, trim goatee",
  },
  {
    name: "Weather Girl",
    type: ["famous"],
    description:
      "She might seem simple at first glance, but she's actually smarter than most and knows what's going on in this little world of ours. She'll make the perfect sidekick for your adventures.",
    appearance:
      "Weather Girl, 1 human woman, blonde, curly hair, glasses, lipstick",
  },
];
export const types = {
  darkness:
    "Dangerous and dark pocket friends. They can be criminals, monsters, or people with issues.",
  normal:
    "Mundane people and creatures. They can be moody teenagers, animals like dogs, a milkman, and other normal things.",
  famous:
    "More posh pocket people. Good aligned leaders, artists, sports-folk, and the rich.",
};
export const locations = {
  slums: {
    description: "The slums has low level criminals and poor people.",
    types: ["darkness", "normal"],
  },
  suburbs: {
    description:
      "The suburbs contain middling citizens of decent morality living mundane lives. Your average people.",
    types: ["normal"],
  },
  gatedCommunity: {
    description:
      "Gated Communities have a lot of rich people, celebrities, and different ways to protect them.",
    types: ["normal", "famous"],
  },
};
