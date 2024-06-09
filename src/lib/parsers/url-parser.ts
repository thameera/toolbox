import { IParsedURL } from "./types";

const parseHash = (hash: string): Record<string, string> => {
  const hashStr = hash.slice(1); // remove the hash in the beginning
  return Object.fromEntries(new URLSearchParams(hashStr).entries());
};

export const parseURL = (input: string): IParsedURL | null => {
  try {
    const url = new URL(input);
    const query = Object.fromEntries(url.searchParams.entries());
    const hash = parseHash(url.hash);

    return {
      type: "url",
      protocol: url.protocol,
      host: url.host,
      port: url.port,
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
