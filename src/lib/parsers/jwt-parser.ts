import { jwtDecode } from "jwt-decode";
import { IParsedJWT } from "./types";

export function parseJWT(jwt: string): IParsedJWT | null {
  try {
    const header = jwtDecode(jwt, { header: true });
    const payload = jwtDecode(jwt);

    return {
      type: "jwt",
      header,
      payload,
    };
  } catch (e) {
    return null;
  }
}
