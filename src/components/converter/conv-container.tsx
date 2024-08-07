import { DynamicTextarea } from "../dynamic-textarea";
import { useState } from "react";
import { convertText } from "@/lib/converters";
import { ConverterButtons } from "./conv-buttons";

export function ConvContainer(): JSX.Element {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleTextChange = (text: string) => {
    setInput(text);
  };

  const convert = (taskId: string, data?: Object) => {
    console.log(taskId);
    let textToConvert = input;

    /*
     * If data is provided (used by some complex converters), we convert
     * the input to a JSON string
     */
    if (data) {
      textToConvert = JSON.stringify({ ...data, input });
    }

    const out = convertText(taskId, textToConvert);
    setOutput(out);
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
          <DynamicTextarea value={output} readOnly={true} copyable={true} />
        </div>
      </div>
      <div className="pl-2 w-1/2">
        <ConverterButtons convertCallback={convert} />
      </div>
    </div>
  );
}
