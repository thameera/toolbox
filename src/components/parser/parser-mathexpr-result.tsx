import { IParsedMathExpr } from "@/lib/parsers/types";
import { DynamicTextarea } from "../dynamic-textarea";

interface ParserMathExprResultProps {
  mathExpr: IParsedMathExpr;
}

export function ParserMathExprResult({
  mathExpr,
}: ParserMathExprResultProps): JSX.Element {
  return (
    <>
      <div className="font-bold text-xl mb-4">Math expression</div>
      <DynamicTextarea
        value={mathExpr.result}
        readOnly={true}
        copyable={true}
      />
    </>
  );
}
