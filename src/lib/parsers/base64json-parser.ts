import JSON5 from "json5";
import { IParsedBase64JSON } from "./types";

export function parseBase64JSON(str: string): IParsedBase64JSON | null {
  try {
    const decoded = atob(str);
    const parsed = JSON5.parse(decoded);
    return {
      type: "base64json",
      json: parsed,
    };
  } catch (e) {
    return null;
  }
}
