import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ParserXMLResult } from "./parser-xml-result";
import { IParsedXML } from "@/lib/parsers/types";

// Mock CodeView
jest.mock("../codeview", () => ({
  __esModule: true,
  default: ({ code }: { code: string }) => (
    <pre data-testid="code-view">{code}</pre>
  ),
}));

const mockXML: IParsedXML = {
  type: "xml",
  prettyXml: `<constructionTeam>
  <teamMember id="1">
    <name>Michael Brown</name>
    <role>Architect</role>
  </teamMember>
</constructionTeam>`,
};

describe("ParserXMLResult", () => {
  it("renders the XML content correctly in JSON view", async () => {
    render(<ParserXMLResult xml={mockXML} />);

    expect(screen.getByText("XML")).toBeInTheDocument();

    const codeView = await screen.findByTestId("code-view");
    expect(codeView).toBeInTheDocument();

    const normalizedXml = `<constructionTeam> <teamMember id="1"> <name>Michael Brown</name> <role>Architect</role> </teamMember> </constructionTeam>`;
    expect(codeView).toHaveTextContent(normalizedXml);
  });
});
