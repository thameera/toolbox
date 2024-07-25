import { forwardRef, useImperativeHandle, useRef } from "react";
import { parse } from "@/lib/parsers";
import {
  IParsedBase64JSON,
  IParsedJSON,
  IParsedJWT,
  IParsedMathExpr,
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
import { ParserMathExprResult } from "./parser-mathexpr-result";
import { ParserNoneResult } from "./parser-none-result";

type TParsedState = TParseTypes | "";

export interface ParserColumnRef {
  setTextInput: (text: string) => void;
}

export const ParserColumn = forwardRef<ParserColumnRef>(
  (_, ref): JSX.Element => {
    const [text, setText] = useState<string>("");
    const [type, setType] = useState<TParsedState>("");
    const [parsedData, setParsedData] = useState<TParsed | null>(null);

    const handleTextChange = (text: string) => {
      const parsed: TParsed = parse(text);
      console.log(parsed);
      setType(parsed.type);
      setParsedData(parsed);
    };

    /*
     * We expose this ref to parser container so it can be used to manipulate the text input
     * to be uesd by random examples, tutorial, etc.
     */
    useImperativeHandle(ref, () => ({
      setTextInput: (text: string) => {
        setText(text);
        handleTextChange(text);
      },
    }));

    return (
      <div>
        <DynamicTextarea
          placeholder="Paste something here"
          value={text}
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
          {type === "math-expr" && (
            <ParserMathExprResult mathExpr={parsedData as IParsedMathExpr} />
          )}
          {type === "" && <ParserNoneResult />}
        </div>
      </div>
    );
  },
);

ParserColumn.displayName = "ParserColumn";
