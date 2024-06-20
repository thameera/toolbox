import { IParsedXML } from "@/lib/parsers/types";
import CodeView from "../codeview";

interface ParserXMLResultProps {
  xml: IParsedXML;
}

export function ParserXMLResult({ xml }: ParserXMLResultProps): JSX.Element {
  return (
    <>
      <div className="font-bold text-xl mb-4">XML</div>
      <CodeView code={xml.prettyXml} language="xml" />
    </>
  );
}
