import * as basicEncodings from "./basicEncodings";
import * as timeConverters from "./timeConverters";

type ConverterFunction = (text: string) => string;

const converters: Record<string, ConverterFunction> = {
  ...basicEncodings,
  ...timeConverters,
};

export const convertText = (taskId: string, text: string): string => {
  const converter = converters[taskId];
  if (converter) {
    return converter(text);
  }
  console.error(`Converter not found for task: ${taskId}`);
  return "";
};
