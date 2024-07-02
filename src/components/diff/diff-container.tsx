import { DiffTextarea } from "./diff-textarea";
import { DiffView } from "./diff-view";

export function DiffContainer(): JSX.Element {
  const handleTextChange = (text: string) => {
    console.log(text);
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="pr-2 w-1/2">
          <DiffTextarea onChange={handleTextChange} />
        </div>
        <div className="pl-2 w-1/2">
          <DiffTextarea onChange={handleTextChange} />
        </div>
      </div>

      <div className="mt-4">
        <DiffView type="text" oldValue="old value" newValue="new value" />
      </div>
    </div>
  );
}
