import { IParsedMathExpr } from "./types";
import Mexp from "math-expression-evaluator";

const mexp = new Mexp();

export function parseMathExpr(str: string): IParsedMathExpr | null {
  try {
    const result = mexp.eval(str);
    return {
      type: "math-expr",
      result: result.toString(),
    };
  } catch (e) {
    return null;
  }
}
