import { IParsedText } from "@/lib/parsers/types";

interface ParserTextResultProps {
  result: IParsedText;
}

export function ParserTextResult({
  result,
}: ParserTextResultProps): JSX.Element {
  return (
    <>
      <div className="font-bold text-xl">Text</div>
      <div className="mt-2">
        <div>Words: {result.words}</div>
        <div>Characters: {result.characters}</div>
      </div>
    </>
  );
}
