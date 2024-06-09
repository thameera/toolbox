import { IParsedText } from "./types";

export const parseText = (input: string): IParsedText => {
  return {
    type: "text",
    words: input.split(/\s/).filter((w) => !!w).length,
    characters: input.length,
  };
};
