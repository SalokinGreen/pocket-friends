import { Encoder } from "nai-js-tokenizer";

// import tokenizerData from "../tokenizers/7nerdstash_tokenizer_v2.json";
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
}
export default function buildContext(
  memory: string,
  location: LocationProps,
  classes: ClassProps[],
  friends: FriendProps[],
  size: number,
  addon: string
) {
  //   let encoder = new Encoder(vocab, merges, specialTokens, config);
  return fetch("./tokenizers/nerdstash_tokenizer_v2.json")
    .then((response) => response.json())
    .then((data) => {
      let encoder = new Encoder(
        data.vocab,
        data.merges,
        data.specialTokens,
        data.config
      );
      let tokenSize = 0;
      let returnString = "";
      tokenSize += encoder.encode("memory").length;
      returnString += memory + "\n";
      const locationString = `----\n${location.name} (location)\n${location.description}\n`;
      tokenSize += encoder.encode(locationString).length;
      returnString += locationString;
      classes.forEach((e) => {
        const classString = `----\n${e.name} (type)\n${e.description}\n`;
        if (tokenSize + encoder.encode(classString).length > size / 2) return;
        tokenSize += encoder.encode(classString).length;
        returnString += classString;
      });
      friends.forEach((e) => {
        const friendString = `----\nType: ${e.types.join(
          ", "
        )}\nLocation: ${e.location.join(", ")}\nName: ${e.name}\nDescription: ${
          e.description
        }\nAppearance: ${e.appearance}\n`;
        if (tokenSize + encoder.encode(friendString).length > size / 2) return;
        tokenSize += encoder.encode(friendString).length;
        returnString += friendString;
      });
      returnString += addon;
      returnString = cleanString(returnString);
      console.log(returnString);
      return returnString;
    });
}

function cleanString(string: string) {
  // remove white spaces
  while (string.includes("\n\n")) {
    string = string.replace("\n\n", "\n");
  }
  while (string.includes(" \n")) {
    string = string.replace(" \n", "\n");
  }
  while (string.includes("\n ")) {
    string = string.replace("\n ", "\n");
  }

  while (string.includes("  ")) {
    string = string.replace("  ", " ");
  }
  string = string.trim();

  return string;
}
