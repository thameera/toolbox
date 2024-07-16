import * as basicEncodings from "./basicEncodings";
import * as textConverters from "./textConverters";
import * as timeConverters from "./timeConverters";
import * as miscGenerators from "./miscGenerators";

type ConverterFunction = (text: string) => string;

/*
 * Create an index of all converter functions
 */
const converters: Record<string, ConverterFunction> = {
  ...basicEncodings,
  ...textConverters,
  ...timeConverters,
  ...miscGenerators,
};

export const convertText = (taskId: string, text: string): string => {
  // Pick the converter function based on the task ID
  const converter = converters[taskId];
  if (converter) {
    return converter(text);
  }

  console.error(`Converter not found for task: ${taskId}`);
  return "";
};
