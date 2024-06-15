import { render, screen } from "@testing-library/react";
import { ParserTextResult } from "./parser-text-result";
import { IParsedText } from "@/lib/parsers/types";
import "@testing-library/jest-dom";

const mockParsedText: IParsedText = {
  type: "text",
  words: 100,
  characters: 500,
};

describe("ParserTextResult", () => {
  it("displays the correct number of words and characters", () => {
    render(<ParserTextResult result={mockParsedText} />);

    expect(screen.getByText("Words: 100")).toBeInTheDocument();
    expect(screen.getByText("Characters: 500")).toBeInTheDocument();
  });
});
