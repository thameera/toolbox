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

    // Trim is required since this adds a newline at the beginning
    let prettyXml: string = builder.build(parsedObject).trim();

    return {
      type: "xml",
      prettyXml,
    };
  } catch (e) {
    return null;
  }
}
