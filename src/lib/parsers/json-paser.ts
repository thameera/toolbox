import { IParsedJSON } from "./types";

export function parseJSON(json: string): IParsedJSON | null {
  try {
    return {
      type: "json",
      json: JSON.parse(json),
    };
  } catch (e) {
    return null;
  }
}
