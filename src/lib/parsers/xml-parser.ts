import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { IParsedXML } from "./types";

export function parseXML(xmlStr: string): IParsedXML | null {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      preserveOrder: true,
    });
    const parsedObject = parser.parse(xmlStr, true);

    const builder = new XMLBuilder({
      format: true,
      ignoreAttributes: false,
      preserveOrder: true,
    });
    const prettyXml: string = builder.build(parsedObject);

    return {
      type: "xml",
      prettyXml,
    };
  } catch (e) {
    return null;
  }
}
