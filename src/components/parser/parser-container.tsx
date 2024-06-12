import { ParserColumn } from "./parser-column";

export function ParserContainer(): JSX.Element {
  return (
    <div className="flex flex-row">
      <div className="w-1/2">
        <ParserColumn />
      </div>
      <div className="w-1/2">
        <ParserColumn />
      </div>
    </div>
  );
}
