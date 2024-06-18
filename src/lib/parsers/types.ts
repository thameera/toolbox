export type TParseTypes = "url" | "jwt" | "json" | "text";

type JsonObject = { [key: string]: any };

export interface IParsedURL {
  type: "url";
  protocol: string;
  host: string;
  port: string;
  path: string;
  username: string;
  password: string;
  query: Record<string, string>;
  hash: Record<string, string>;
}

export interface IParsedJWT {
  type: "jwt";
  header: JsonObject;
  payload: JsonObject;
}

export interface IParsedText {
  type: "text";
  words: number;
  characters: number;
}

export interface IParsedJSON {
  type: "json";
  json: JsonObject | any[];
  arrLength?: number;
}

export interface IParsedNone {
  type: "";
}

export type TParsed =
  | IParsedURL
  | IParsedText
  | IParsedJWT
  | IParsedJSON
  | IParsedNone;
