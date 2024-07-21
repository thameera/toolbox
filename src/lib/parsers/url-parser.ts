import { URL } from "whatwg-url";
import { IParsedURL } from "./types";

const parseHash = (hash: string): Record<string, string> => {
  const hashStr = hash.slice(1); // remove the hash in the beginning
  return Object.fromEntries(new URLSearchParams(hashStr).entries());
};

export const parseURL = (input: string): IParsedURL | null => {
  try {
    // Support partial URLs like "/path?query=1"
    let isPartial = false;
    if (!input.includes("://") && input.startsWith("/")) {
      input = `http://example.com${input}`;
      isPartial = true;
    }

    const url = new URL(input);
    const query = Object.fromEntries(url.searchParams.entries());
    const hash = parseHash(url.hash);

    return {
      type: "url",
      protocol: isPartial ? "" : url.protocol,
      host: isPartial ? "" : url.host,
      port: isPartial ? "" : url.port,
      path: url.pathname,
      username: url.username,
      password: url.password,
      query,
      hash,
    };
  } catch (e) {
    return null;
  }
};
