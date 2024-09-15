import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IParsedBase64JSON } from "@/lib/parsers/types";
import { ParserBase64JSONResult } from "./parser-base64json-result";

const mockBase64JSON: IParsedBase64JSON = {
  type: "base64json",
  json: {
    returnTo: "http://localhost:3000",
  },
};

// Mock CodeView
jest.mock("../codeview", () => ({
  __esModule: true,
  default: ({ code }: { code: string }) => (
    <pre data-testid="code-view">{code}</pre>
  ),
}));

describe("ParserBase64JSONResult", () => {
  it("renders a Base64-encoded JSON object correctly in JSON view", async () => {
    render(<ParserBase64JSONResult json={mockBase64JSON} />);

    expect(screen.getByText("Base64-encoded JSON")).toBeInTheDocument();

    const jsonView = await screen.findByTestId("code-view");
    const normalizedJson = `{ "returnTo": "http://localhost:3000" }`;
    expect(jsonView).toHaveTextContent(normalizedJson);
  });
});
