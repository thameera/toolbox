import { DynamicTextarea } from "../dynamic-textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { convertText } from "@/lib/converters";

export function ConvContainer(): JSX.Element {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleTextChange = (text: string) => {
    setInput(text);
  };

  const convert = (taskId: string) => {
    console.log(taskId);
    const out = convertText(taskId, input);
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
        <Button onClick={() => convert("base64_encode")}>Base64 Encode</Button>
      </div>
    </div>
  );
}
