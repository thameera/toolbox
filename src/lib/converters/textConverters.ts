export const text_uppercase = (text: string): string => {
  return text.toUpperCase();
};

export const text_lowercase = (text: string): string => {
  return text.toLowerCase();
};

export const text_replace_n_with_newlines = (text: string): string => {
  return text.split("\\n").join("\n");
};

export const text_replace_newlines_with_n = (text: string): string => {
  return text.split("\n").join("\\n");
};
