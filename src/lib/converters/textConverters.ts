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

export const text_replace = (data: string): string => {
  try {
    /*
     * text_replace function is special in that we expect the input to be a JSON string
     * with the following structure:
     */
    const { replace, with: replaceWith, input } = JSON.parse(data);
    return input.split(replace).join(replaceWith);
  } catch (e) {
    return "Internal error";
  }
};
