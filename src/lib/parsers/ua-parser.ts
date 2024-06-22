import { UAParser } from "ua-parser-js";
import { IParsedUserAgent } from "./types";

export function parseUserAgent(uaStr: string): IParsedUserAgent | null {
  try {
    const parser = new UAParser(uaStr);
    const result = parser.getResult();
    console.log(result);

    if (!result?.browser?.name || !result?.os?.name) {
      return null;
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
      browser: `${result.browser.name} ${result.browser.version}`,
      os: `${result.os.name} ${result.os.version}`,
      device: device.trim(),
    };
  } catch (e) {
    return null;
  }
}
