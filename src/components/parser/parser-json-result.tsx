import { IParsedJSON } from "@/lib/parsers/types";
import CodeView from "../codeview";

interface ParserJSONResultProps {
  json: IParsedJSON;
}

export function ParserJSONResult({ json }: ParserJSONResultProps): JSX.Element {
  return (
    <>
      <div className="font-bold text-xl mb-4">JSON</div>
      <CodeView code={JSON.stringify(json.json, null, 2)} language="json" />
    </>
  );
}
