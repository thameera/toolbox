import * as basicEncodings from "./basicEncodings";

export const convertText = (text: string, taskId: string): string => {
  if (basicEncodings[taskId]) {
    return basicEncodings[taskId](text);
  }
  return "";
};
