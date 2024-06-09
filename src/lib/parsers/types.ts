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

export type TParsed = IParsedURL | null;
