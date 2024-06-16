export type TParseTypes = "url" | "jwt" | "text";

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
  header: { [key: string]: any };
  payload: { [key: string]: any };
}

export interface IParsedText {
  type: "text";
  words: number;
  characters: number;
}

export interface IParsedNone {
  type: "";
}

export type TParsed = IParsedURL | IParsedText | IParsedJWT | IParsedNone;
