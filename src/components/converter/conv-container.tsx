import { DynamicTextarea } from "../dynamic-textarea";

export function ConvContainer(): JSX.Element {
  const handleTextChange = (text: string) => {
    console.log(text);
  };

  return (
    <div className="flex flex-row">
      <div className="pr-2 w-1/2 flex flex-col gap-4">
        <div>
          <div>Input:</div>
          <DynamicTextarea
            placeholder="Paste text to convert"
            onChange={handleTextChange}
          />
        </div>
        <div>
          <div>Output:</div>
          <DynamicTextarea placeholder="output" onChange={handleTextChange} />
        </div>
      </div>
    </div>
  );
}
