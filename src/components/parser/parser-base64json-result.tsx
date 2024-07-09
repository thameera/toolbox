import { IParsedBase64JSON } from "@/lib/parsers/types";
import CodeView from "../codeview";

interface ParserBase64JSONResultProps {
  json: IParsedBase64JSON;
}

export function ParserBase64JSONResult({
  json,
}: ParserBase64JSONResultProps): JSX.Element {
  return (
    <>
      <div className="font-bold text-xl mb-4">Base64-encoded JSON</div>
      <CodeView code={JSON.stringify(json.json, null, 2)} language="json" />
    </>
  );
}
