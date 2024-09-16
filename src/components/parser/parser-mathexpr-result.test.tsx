import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ParserMathExprResult } from "./parser-mathexpr-result";
import { IParsedMathExpr } from "@/lib/parsers/types";

const mockMathExpr: IParsedMathExpr = {
  type: "math-expr",
  result: "16.8",
};

describe("ParserMathExprResult", () => {
  it("renders math expression result", async () => {
    render(<ParserMathExprResult mathExpr={mockMathExpr} />);

    expect(screen.getByText("Math expression")).toBeInTheDocument();

    const result = screen.getByText("16.8");
    expect(result).toBeInTheDocument();
  });
});
