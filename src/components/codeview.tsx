"use client";

import CodeMirror from "@uiw/react-codemirror";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { EditorView } from "@codemirror/view";
import { CopyButton } from "@/components/copy-button";
import { useTheme } from "next-themes";

type CodeViewProps = {
  code: string;
  language: string;
};

const getLanguageExtension = (language: string) => {
  switch (language) {
    case "json":
      return json();
    case "xml":
      return xml();
    default:
      return json();
  }
};

export default function CodeView({
  code,
  language,
}: CodeViewProps): JSX.Element {
  const { theme } = useTheme();
  const cmTheme = theme === "dark" ? githubDark : githubLight;

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
      <CodeMirror
        value={code}
        theme={cmTheme}
        height="auto"
        extensions={extensions}
        readOnly
      />
    </div>
  );
}
