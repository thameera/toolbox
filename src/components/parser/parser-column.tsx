import { parse } from "@/lib/parsers";
import { ParserTextarea } from "./parser-textarea";
import { TParsed } from "@/lib/parsers/types";

export function ParserColumn(): JSX.Element {
  const handleTextChange = (text: string) => {
    const parsed: TParsed = parse(text);
    console.log(parsed);
  };

  return (
    <div>
      <ParserTextarea onChange={handleTextChange} />
    </div>
  );
}
