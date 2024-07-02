import { getValuesToDiff } from "@/lib/diff";
import { DiffTextarea } from "./diff-textarea";
import { DiffView } from "./diff-view";
import { useState } from "react";

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

  return (
    <div>
      <div className="flex flex-row">
        <div className="pr-2 w-1/2">
          <DiffTextarea onChange={handleTextChangeLeft} />
        </div>
        <div className="pl-2 w-1/2">
          <DiffTextarea onChange={handleTextChangeRight} />
        </div>
      </div>

      <div className="mt-4">
        <DiffView type={diffType} oldValue={oldValue} newValue={newValue} />
      </div>
    </div>
  );
}
