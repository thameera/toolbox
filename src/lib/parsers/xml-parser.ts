import { XMLParser } from "fast-xml-parser";
import xmlFormatter from "xml-formatter";
import { IParsedXML } from "./types";

const isValidXML = (str: string): boolean => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseAttributeValue: true,
    allowBooleanAttributes: true,
  });

  try {
    parser.parse(str, true);
    return true;
  } catch (e) {
    return false;
  }
};

export function parseXML(xml: string): IParsedXML | null {
  if (!isValidXML(xml)) {
    return null;
  }

  const prettyXml = xmlFormatter(xml, {
    indentation: "  ",
    lineSeparator: "\n",
  });

  return {
    type: "xml",
    prettyXml,
  };
}
