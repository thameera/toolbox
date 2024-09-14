import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IParsedJSON } from "@/lib/parsers/types";
import { ParserJSONResult } from "./parser-json-result";
import userEvent from "@testing-library/user-event";

// Mock CodeView
jest.mock("../codeview", () => ({
  __esModule: true,
  default: ({ code }: { code: string }) => (
    <pre data-testid="code-view">{code}</pre>
  ),
}));

const mockObject: IParsedJSON = {
  type: "json",
  json: {
    id: 1,
    name: "Leslie Knope",
    dept: "Parks & Rec",
    city: "Pawnee",
    state: "IN",
    lovesWaffles: true,
  },
};

const mockArray: IParsedJSON = {
  type: "json",
  json: [
    { id: 1, name: "Leslie Knope" },
    { id: 2, name: "Ron Swanson" },
  ],
  arrLength: 2,
};

const largeObject: {
  items: { id: number; name: string; description: string }[];
} = {
  items: [],
};
for (let i = 0; i < 10; i++) {
  largeObject.items.push({
    id: i,
    name: `Person ${i}`,
    description: "This is a description".repeat(50),
  });
}
const mockLargeObject: IParsedJSON = {
  type: "json",
  json: largeObject,
};

describe("ParserJSONResult", () => {
  it("renders a JSON object correctly in JSON view", async () => {
    render(<ParserJSONResult json={mockObject} />);

    expect(screen.getByText("JSON Object")).toBeInTheDocument();

    userEvent.click(screen.getByText("JSON"));
    const jsonView = await screen.findByTestId("code-view");
    expect(jsonView).toBeInTheDocument();

    const normalizedJson = `{ "id": 1, "name": "Leslie Knope", "dept": "Parks & Rec", "city": "Pawnee", "state": "IN", "lovesWaffles": true }`;
    expect(jsonView).toHaveTextContent(normalizedJson);
  });

  it("renders a JSON object correctly in Table view", async () => {
    render(<ParserJSONResult json={mockObject} />);

    expect(screen.getByText("JSON Object")).toBeInTheDocument();

    userEvent.click(screen.getByText("Table"));
    const tableView = await screen.findByTestId("table-view");
    expect(tableView).toBeInTheDocument();

    const tableRows = tableView.querySelectorAll("tr");
    expect(tableRows).toHaveLength(6); // Number of keys in the JSON object

    const tableCells = tableView.querySelectorAll("td");
    expect(tableCells).toHaveLength(12); // Number of key-value pairs in the JSON object

    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("Leslie Knope")).toBeInTheDocument();
  });

  it("renders a JSON array correctly", async () => {
    render(<ParserJSONResult json={mockArray} />);

    expect(screen.getByText("JSON Array (2 items)")).toBeInTheDocument();

    const jsonView = await screen.findByTestId("code-view");
    expect(jsonView).toBeInTheDocument();

    const normalizedJson = `[ { "id": 1, "name": "Leslie Knope" }, { "id": 2, "name": "Ron Swanson" } ]`;
    expect(jsonView).toHaveTextContent(normalizedJson);
  });

  it("renders a large JSON object without the Table view", async () => {
    render(<ParserJSONResult json={mockLargeObject} />);

    expect(screen.getByText("JSON Object")).toBeInTheDocument();

    expect(screen.queryByTestId("big-json-view")).toBeInTheDocument();
    expect(screen.queryByTestId("tabbed-view")).not.toBeInTheDocument();
  });
});
