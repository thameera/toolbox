import { UAParser } from "ua-parser-js";
import { IParsedUserAgent } from "./types";

export function parseUserAgent(uaStr: string): IParsedUserAgent | null {
  try {
    const parser = new UAParser(uaStr);
    const result = parser.getResult();

    if (!result?.browser?.name || !result?.os?.name) {
      return null;
    }

    let browser = result.browser.name;
    if (result.browser.version) {
      browser += ` ${result.browser.version}`;
    }

    let os = result.os.name;
    if (result.os.version) {
      os += ` ${result.os.version}`;
    }

    let device = "";
    if (result.device.vendor) {
      device = result.device.vendor;
    }
    if (result.device.model) {
      device += ` ${result.device.model}`;
    }
    if (!device.trim()) {
      device = "Unknown";
    }
    if (result.device.type) {
      device = `[${result.device.type}] ${device}`;
    }

    return {
      type: "useragent",
      browser,
      os,
      device,
    };
  } catch (e) {
    return null;
  }
}
