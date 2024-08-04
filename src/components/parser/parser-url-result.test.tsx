import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ParserURLResult } from "./parser-url-result";
import { IParsedURL } from "@/lib/parsers/types";

// Mocking clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

const mockURL: IParsedURL = {
  type: "url",
  protocol: "https:",
  host: "example.com",
  port: "443",
  path: "/path/to/resource",
  username: "user",
  password: "pass",
  query: { query1: "value1", query2: "value2" },
  hash: { hash1: "value3", hash2: "value4" },
};

describe("ParserURLResult", () => {
  it("renders URL details", () => {
    render(<ParserURLResult url={mockURL} />);

    expect(screen.getByText("Protocol")).toBeInTheDocument();
    expect(screen.getByText("https:")).toBeInTheDocument();
    expect(screen.getByText("Host")).toBeInTheDocument();
    expect(screen.getByText("example.com")).toBeInTheDocument();
    expect(screen.getByText("Port")).toBeInTheDocument();
    expect(screen.getByText("443")).toBeInTheDocument();
    expect(screen.getByText("Path")).toBeInTheDocument();
    expect(screen.getByText("/path/to/resource")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("pass")).toBeInTheDocument();
  });

  it("renders query params", () => {
    render(<ParserURLResult url={mockURL} />);

    expect(screen.getByText("Query params")).toBeInTheDocument();
    expect(screen.getByText("query1")).toBeInTheDocument();
    expect(screen.getByText("value1")).toBeInTheDocument();
    expect(screen.getByText("query2")).toBeInTheDocument();
    expect(screen.getByText("value2")).toBeInTheDocument();
  });

  it("renders hash params", () => {
    render(<ParserURLResult url={mockURL} />);

    expect(screen.getByText("Hash params")).toBeInTheDocument();
    expect(screen.getByText("hash1")).toBeInTheDocument();
    expect(screen.getByText("value3")).toBeInTheDocument();
    expect(screen.getByText("hash2")).toBeInTheDocument();
    expect(screen.getByText("value4")).toBeInTheDocument();
  });

  it("does not render query and hash sections if empty", () => {
    const emptyParamsURL: IParsedURL = {
      ...mockURL,
      query: {},
      hash: {},
    };

    render(<ParserURLResult url={emptyParamsURL} />);

    expect(screen.queryByText("Query params")).not.toBeInTheDocument();
    expect(screen.queryByText("Hash params")).not.toBeInTheDocument();
  });

  it("renders the copy buttons correctly", async () => {
    render(<ParserURLResult url={mockURL} />);

    const copyButtons = screen.getAllByTestId("copy-button");
    expect(copyButtons).toHaveLength(10);

    await act(async () => fireEvent.click(copyButtons[0]));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https:");
  });
});
