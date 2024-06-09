import { ParserTextarea } from "./parser-textarea";

export function ParserColumn(): JSX.Element {
  const handleTextChange = (text: string) => {
    console.log(text);
  };

  return (
    <div>
      <ParserTextarea onChange={handleTextChange} />
    </div>
  );
}
