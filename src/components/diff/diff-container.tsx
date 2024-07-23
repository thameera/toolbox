import { getValuesToDiff } from "@/lib/diff";
import { DiffView } from "./diff-view";
import { useState } from "react";
import { DynamicTextarea } from "../dynamic-textarea";
import { Button } from "@/components/ui/button";
import { randomDiffExample } from "@/lib/diff/random-example";

type TDiffInput = string | object;

export function DiffContainer(): JSX.Element {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [oldValue, setOldValue] = useState<TDiffInput>("");
  const [newValue, setNewValue] = useState<TDiffInput>("");
  const [diffType, setDiffType] = useState<"text" | "json">("text");

  const handleTextChange = (left: string, right: string) => {
    const { type, oldValue, newValue } = getValuesToDiff(left, right);
    setDiffType(type);
    setOldValue(oldValue);
    setNewValue(newValue);
  };

  const handleTextChangeLeft = (text: string) => {
    setLeftText(text);
    handleTextChange(text, rightText);
  };

  const handleTextChangeRight = (text: string) => {
    setRightText(text);
    handleTextChange(leftText, text);
  };

  const renderTitle = (): JSX.Element => {
    if (oldValue === "" && newValue === "") {
      return <div />;
    }
    if (diffType === "json") {
      return <div className="font-bold text-xl">JSON Diff</div>;
    }
    return <div className="font-bold text-xl">Text Diff</div>;
  };

  const showRandomExample = () => {
    const example = randomDiffExample();
    setLeftText(example.left);
    setRightText(example.right);
    handleTextChange(example.left, example.right);
  };

  return (
    <div>
      <div className="flex mb-2">
        <Button variant="outline" className="p-2" onClick={showRandomExample}>
          Random example
        </Button>
      </div>
      <div className="flex flex-row">
        <div className="pr-2 w-1/2">
          <DynamicTextarea
            placeholder="Paste text or JSON"
            value={leftText}
            onChange={handleTextChangeLeft}
          />
        </div>
        <div className="pl-2 w-1/2">
          <DynamicTextarea
            placeholder="Paste text or JSON"
            value={rightText}
            onChange={handleTextChangeRight}
          />
        </div>
      </div>

      <div className="mt-4">
        {renderTitle()}
        <DiffView type={diffType} oldValue={oldValue} newValue={newValue} />
      </div>
    </div>
  );
}
