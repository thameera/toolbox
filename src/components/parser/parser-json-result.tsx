import { IParsedJSON } from "@/lib/parsers/types";
import CodeView from "../codeview";

interface ParserJSONResultProps {
  json: IParsedJSON;
}

export function ParserJSONResult({ json }: ParserJSONResultProps): JSX.Element {
  const title = json.arrLength
    ? `JSON Array (${json.arrLength} items)`
    : "JSON Object";

  return (
    <>
      <div className="font-bold text-xl mb-4">{title}</div>
      <CodeView code={JSON.stringify(json.json, null, 2)} language="json" />
    </>
  );
}
