import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { EditorView } from "@codemirror/view";
import { CopyButton } from "@/components/copy-button";

type CodeViewProps = {
  code: string;
  language: string;
};

const getLanguageExtension = (language: string) => {
  switch (language) {
    case "json":
      return json();
    default:
      return json();
  }
};

export default function CodeView({
  code,
  language,
}: CodeViewProps): JSX.Element {
  const extensions = [
    getLanguageExtension(language),
    EditorView.theme({
      ".cm-activeLine": {
        backgroundColor: "transparent",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "transparent",
      },
    }),
  ];
  return (
    <div className="relative border border-gray-300">
      <div className="absolute top-1 right-1 z-10">
        <CopyButton text={code} />
      </div>
      <CodeMirror value={code} height="auto" extensions={extensions} readOnly />
    </div>
  );
}
