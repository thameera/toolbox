import { IParsedJSON } from "./types";

export function parseJSON(json: string): IParsedJSON | null {
  try {
    const parsed = JSON.parse(json);
    return {
      type: "json",
      json: parsed,
      arrLength: Array.isArray(parsed) ? parsed.length : 0,
    };
  } catch (e) {
    return null;
  }
}
