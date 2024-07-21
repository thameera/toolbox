import { TParsed } from "./types";
import { parseJWT } from "./jwt-parser";
import { parseText } from "./text-parser";
import { parseURL } from "./url-parser";
import { parseJSON } from "./json-paser";
import { parseXML } from "./xml-parser";
import { parseUserAgent } from "./ua-parser";
import { parseBase64JSON } from "./base64json-parser";
import { parseX509Cert } from "./x509";
import { parseMathExpr } from "./math-expr-parser";

type TParserFn = (input: string) => TParsed | null;

const parsers: TParserFn[] = [
  parseUserAgent,
  parseURL,
  parseJWT,
  parseJSON,
  parseXML,
  parseBase64JSON,
  parseX509Cert,
  parseMathExpr,
];

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
