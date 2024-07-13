export const base64_encode = (text: string): string => {
  try {
    return btoa(text);
  } catch (e) {
    return "Cannot base64 encode (maybe invalid characters?)";
  }
};

export const base64_decode = (text: string): string => {
  try {
    return atob(text);
  } catch (e) {
    return "Invalid base64 string";
  }
};

export const url_encode = (text: string): string => {
  try {
    return encodeURIComponent(text);
  } catch (e) {
    return "Cannot URL encode (possibly a lone surrogate)";
  }
};

export const url_decode = (text: string): string => {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return "Invalid URL encoded string";
  }
};
