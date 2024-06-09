import { parseText } from "./text-parser";
import { TParsed } from "./types";
import { parseURL } from "./url-parser";

type TParserFn = (input: string) => TParsed;

const parsers: TParserFn[] = [parseURL, parseText];

export const parse = (input: string): TParsed => {
  for (const parser of parsers) {
    const parsed: TParsed = parser(input);
    if (parsed) {
      return parsed;
    }
  }

  // This should not happen, because parseText will always return a value
  return null;
};
