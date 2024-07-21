import { parse } from "@/lib/parsers";
import {
  IParsedBase64JSON,
  IParsedJSON,
  IParsedJWT,
  IParsedText,
  IParsedURL,
  IParsedUserAgent,
  IParsedX509Cert,
  IParsedXML,
  TParseTypes,
  TParsed,
} from "@/lib/parsers/types";
import { useState } from "react";
import { ParserURLResult } from "./parser-url-result";
import { ParserTextResult } from "./parser-text-result";
import { ParserJWTResult } from "./parser-jwt-result";
import { ParserJSONResult } from "./parser-json-result";
import { ParserXMLResult } from "./parser-xml-result";
import { ParserUserAgentResult } from "./parser-ua-result";
import { ParserBase64JSONResult } from "./parser-base64json-result";
import { DynamicTextarea } from "../dynamic-textarea";
import { ParserCertResult } from "./parser-cert-result";

type TParsedState = TParseTypes | "";

export function ParserColumn(): JSX.Element {
  const [type, setType] = useState<TParsedState>("");
  const [parsedData, setParsedData] = useState<TParsed | null>(null);

  const handleTextChange = (text: string) => {
    const parsed: TParsed = parse(text);
    console.log(parsed);
    setType(parsed.type);
    setParsedData(parsed);
    console.log(parsedData);
  };

  return (
    <div>
      <DynamicTextarea
        placeholder="Paste something here"
        onChange={handleTextChange}
      />

      <div className="mt-4">
        {type === "url" && <ParserURLResult url={parsedData as IParsedURL} />}
        {type === "text" && (
          <ParserTextResult result={parsedData as IParsedText} />
        )}
        {type === "jwt" && <ParserJWTResult jwt={parsedData as IParsedJWT} />}
        {type === "json" && (
          <ParserJSONResult json={parsedData as IParsedJSON} />
        )}
        {type === "xml" && <ParserXMLResult xml={parsedData as IParsedXML} />}
        {type === "useragent" && (
          <ParserUserAgentResult userAgent={parsedData as IParsedUserAgent} />
        )}
        {type === "base64json" && (
          <ParserBase64JSONResult json={parsedData as IParsedBase64JSON} />
        )}
        {type === "x509cert" && (
          <ParserCertResult cert={parsedData as IParsedX509Cert} />
        )}
      </div>
    </div>
  );
}
