import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

type DiffViewProps = {
  type: "text" | "json";
  oldValue: string | object;
  newValue: string | object;
};

export const DiffView = ({
  type,
  oldValue,
  newValue,
}: DiffViewProps): JSX.Element => {
  const diffMethod = type === "json" ? DiffMethod.JSON : DiffMethod.CHARS;

  return (
    <ReactDiffViewer
      oldValue={oldValue}
      newValue={newValue}
      splitView={false}
      compareMethod={diffMethod}
    />
  );
};
