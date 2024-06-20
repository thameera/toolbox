import { parse } from "@/lib/parsers";
import { ParserTextarea } from "./parser-textarea";
import {
  IParsedJSON,
  IParsedJWT,
  IParsedText,
  IParsedURL,
  IParsedXML,
  TParseTypes,
  TParsed,
} from "@/lib/parsers/types";
import { useState } from "react";
import { ParserURLResult } from "./parser-url-result";
import { ParserTextResult } from "./parser-text-result";
import { ParserJWTResult } from "./parser-jwt-result";
import { ParserJSONResult } from "./parser-json-result";

type TParsedState = TParseTypes | "";

export function ParserColumn(): JSX.Element {
  const [type, setType] = useState<TParsedState>("");
  const [parsedData, setParsedData] = useState<TParsed | null>(null);

  const handleTextChange = (text: string) => {
    const parsed: TParsed = parse(text);
    console.log(parsed);
    setType(parsed.type);
    setParsedData(parsed);
  };

  if (type === "xml") {
    console.log(parsedData);
  }

  return (
    <div className="p-4">
      <ParserTextarea onChange={handleTextChange} />

      <div className="mt-4">
        {type === "url" && <ParserURLResult url={parsedData as IParsedURL} />}
        {type === "text" && (
          <ParserTextResult result={parsedData as IParsedText} />
        )}
        {type === "jwt" && <ParserJWTResult jwt={parsedData as IParsedJWT} />}
        {type === "json" && (
          <ParserJSONResult json={parsedData as IParsedJSON} />
        )}
        {type === "xml" && <pre>{(parsedData as IParsedXML).prettyXml}</pre>}
      </div>
    </div>
  );
}
