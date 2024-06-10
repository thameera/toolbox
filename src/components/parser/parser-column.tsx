import { parse } from "@/lib/parsers";
import { ParserTextarea } from "./parser-textarea";
import { IParsedURL, TParseTypes, TParsed } from "@/lib/parsers/types";
import { useState } from "react";
import { ParserURLResult } from "./parser-url-result";

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
    <div>
      <ParserTextarea onChange={handleTextChange} />

      <div className="mt-4">
        {type === "url" && <ParserURLResult url={parsedData as IParsedURL} />}
      </div>
    </div>
  );
}
