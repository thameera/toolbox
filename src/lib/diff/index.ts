import JSON5 from "json5";

interface TValuesToDiff {
  type: "text" | "json";
  oldValue: string | object;
  newValue: string | object;
}

export const getValuesToDiff = (
  oldValue: string,
  newValue: string,
): TValuesToDiff => {
  try {
    const oldJSON = JSON5.parse(oldValue);
    const newJSON = JSON5.parse(newValue);
    return { type: "json", oldValue: oldJSON, newValue: newJSON };
  } catch (e) {
    return { type: "text", oldValue, newValue };
  }
};
