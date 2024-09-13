import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ParserJWTResult } from "./parser-jwt-result";
import { IParsedJWT } from "@/lib/parsers/types";

// Mocking clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

// Mock CodeView
jest.mock("../codeview", () => ({
  __esModule: true,
  default: ({ code }: { code: string }) => <pre>{code}</pre>,
}));

const mockJWT: IParsedJWT = {
  type: "jwt",
  header: {
    alg: "HS256",
    typ: "JWT",
  },
  payload: {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    exp: 1716239022,
    iat: 1516239022,
  },
};

describe("ParserJWTResult", () => {
  it("renders JWT header and payload in JSON view", async () => {
    render(<ParserJWTResult jwt={mockJWT} />);

    userEvent.click(screen.getByText("JSON"));
    const jsonView = await screen.findByTestId("json-view");

    expect(jsonView).toBeInTheDocument();

    const preElements = jsonView.querySelectorAll("pre");
    expect(preElements).toHaveLength(2); // Header and Payload

    const headerJson = preElements[0].textContent;
    const payloadJson = preElements[1].textContent;

    expect(headerJson).toContain('"alg": "HS256"');
    expect(headerJson).toContain('"typ": "JWT"');

    expect(payloadJson).toContain('"sub": "1234567890"');
    expect(payloadJson).toContain('"name": "John Doe"');
    expect(payloadJson).toContain('"admin": true');
    expect(payloadJson).toContain('"exp": 1716239022');
    expect(payloadJson).toContain('"iat": 1516239022');
  });

  it("renders JWT header and payload in Table view", async () => {
    render(<ParserJWTResult jwt={mockJWT} />);

    userEvent.click(screen.getByText("Table"));
    const tableView = await screen.findByTestId("table-view");

    expect(tableView).toBeInTheDocument();

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("alg")).toBeInTheDocument();
    expect(screen.getByText("HS256")).toBeInTheDocument();
    expect(screen.getByText("typ")).toBeInTheDocument();
    expect(screen.getAllByText("JWT")).toHaveLength(2);

    expect(screen.getByText("Payload")).toBeInTheDocument();
    expect(screen.getByText("sub")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("true")).toBeInTheDocument();
    expect(screen.getByText("exp")).toBeInTheDocument();
    expect(screen.getByText("1716239022")).toBeInTheDocument();
    expect(screen.getByText("iat")).toBeInTheDocument();
    expect(screen.getByText("1516239022")).toBeInTheDocument();
  });

  it("renders the copy buttons correctly in Table view", async () => {
    render(<ParserJWTResult jwt={mockJWT} />);

    userEvent.click(screen.getByText("Table"));
    await screen.findByTestId("table-view");

    const copyButtons = screen.getAllByTestId("copy-button");
    expect(copyButtons).toHaveLength(7); // 5 payload + 2 header claims

    await act(async () => fireEvent.click(copyButtons[0]));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("HS256");
  });

  // TODO
  /*
  it("shows ISO timestamps in tooltips for timestamp claims in Table view", async () => {
    render(<ParserJWTResult jwt={mockJWT} />);

    userEvent.click(screen.getByText("Table"));
    await screen.findByTestId("table-view");

    const expElement = screen.getByText("1716239022");
    userEvent.hover(expElement);
    expect(await screen.findByText("2024-06-19T10:30:22.000Z")).toBeInTheDocument();

    const iatElement = screen.getByText("1516239022");
    userEvent.hover(iatElement);
    expect(await screen.findByText("2018-01-18T10:30:22.000Z")).toBeInTheDocument();
  });*/
});
