import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  const diffMethod =
    type === "json" ? DiffMethod.JSON : DiffMethod.WORDS_WITH_SPACE;

  return (
    <ReactDiffViewer
      oldValue={oldValue}
      newValue={newValue}
      splitView={false}
      compareMethod={diffMethod}
      useDarkTheme={theme === "dark"}
    />
  );
};
