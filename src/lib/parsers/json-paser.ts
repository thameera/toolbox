import JSON5 from "json5";
import { IParsedJSON } from "./types";

export function parseJSON(json: string): IParsedJSON | null {
  try {
    const parsed = JSON5.parse(json);

    // If a number is passed, JSON5 will still consider it as valid JSON, so we need this check
    if (typeof parsed !== "object" || parsed === null) {
      return null;
    }

    return {
      type: "json",
      json: parsed,
      arrLength: Array.isArray(parsed) ? parsed.length : 0,
    };
  } catch (e) {
    return null;
  }
}
