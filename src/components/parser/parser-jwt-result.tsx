import { IParsedJWT } from "@/lib/parsers/types";
import CodeView from "../codeview";

interface ParserJWTResultProps {
  jwt: IParsedJWT;
}

export function ParserJWTResult({ jwt }: ParserJWTResultProps): JSX.Element {
  return (
    <div>
      <div className="font-bold text-xl">JWT</div>
      <div className="font-bold mt-2">Header</div>
      <CodeView code={JSON.stringify(jwt.header, null, 2)} language="json" />
      <div className="font-bold mt-2">Payload</div>
      <CodeView code={JSON.stringify(jwt.payload, null, 2)} language="json" />
    </div>
  );
}
