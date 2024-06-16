import { parse } from "@/lib/parsers";
import { ParserTextarea } from "./parser-textarea";
import {
  IParsedJWT,
  IParsedText,
  IParsedURL,
  TParseTypes,
  TParsed,
} from "@/lib/parsers/types";
import { useState } from "react";
import { ParserURLResult } from "./parser-url-result";
import { ParserTextResult } from "./parser-text-result";
import { ParserJWTResult } from "./parser-jwt-result";

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

  return (
    <div className="p-4">
      <ParserTextarea onChange={handleTextChange} />

      <div className="mt-4">
        {type === "url" && <ParserURLResult url={parsedData as IParsedURL} />}
        {type === "text" && (
          <ParserTextResult result={parsedData as IParsedText} />
        )}
        {type === "jwt" && <ParserJWTResult jwt={parsedData as IParsedJWT} />}
      </div>
    </div>
  );
}
