import { parseText } from "./text-parser";
import { TParsed } from "./types";
import { parseURL } from "./url-parser";

type TParserFn = (input: string) => TParsed | null;

const parsers: TParserFn[] = [parseURL];

export const parse = (input: string): TParsed => {
  const trimmed = input.trim();
  if (!trimmed) {
    return { type: "" };
  }

  for (const parser of parsers) {
    const parsed = parser(input);
    if (parsed) {
      return parsed;
    }
  }

  // If all parsers fail, default to text parser
  return parseText(input);
};
