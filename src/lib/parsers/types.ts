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

export interface IParsedText {
  type: "text";
  words: number;
  characters: number;
}

export type TParsed = IParsedURL | IParsedText | null;
