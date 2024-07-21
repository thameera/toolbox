export type TParseTypes =
  | "url"
  | "jwt"
  | "json"
  | "xml"
  | "useragent"
  | "base64json"
  | "x509cert"
  | "text";

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

export interface IParsedXML {
  type: "xml";
  prettyXml: string;
}

export interface IParsedUserAgent {
  type: "useragent";
  browser: string;
  engine: string;
  os: string;
  device: string;
}

export interface IParsedBase64JSON {
  type: "base64json";
  json: JsonObject;
}

export interface IParsedX509Cert {
  type: "x509cert";
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  version: string;
  serialNumber: string;
  algorithm: string;
  thumbprint: string;
  pem: string;
  publicKey: string;
}

export interface IParsedNone {
  type: "";
}

export type TParsed =
  | IParsedURL
  | IParsedText
  | IParsedJWT
  | IParsedJSON
  | IParsedXML
  | IParsedUserAgent
  | IParsedBase64JSON
  | IParsedX509Cert
  | IParsedNone;
