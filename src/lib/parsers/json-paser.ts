import JSON5 from "json5";
import { IParsedJSON } from "./types";

export function parseJSON(json: string): IParsedJSON | null {
  try {
    const parsed = JSON5.parse(json);
    return {
      type: "json",
      json: parsed,
      arrLength: Array.isArray(parsed) ? parsed.length : 0,
    };
  } catch (e) {
    return null;
  }
}
