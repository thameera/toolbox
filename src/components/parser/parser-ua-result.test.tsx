import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { ParserUserAgentResult } from "./parser-ua-result";
import { IParsedUserAgent } from "@/lib/parsers/types";

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

const mockUserAgent: IParsedUserAgent = {
  type: "useragent",
  browser: "Chrome 126.0.0",
  engine: "Blink 126.0.0",
  os: "Mac OS 10.15.7",
  device: "Apple Macintosh",
};

describe("ParserUserAgentResult", () => {
  it("renders User Agent information correctly in Table view", async () => {
    render(<ParserUserAgentResult userAgent={mockUserAgent} />);

    expect(screen.getByText("User Agent")).toBeInTheDocument();

    expect(screen.getByText("Browser")).toBeInTheDocument();
    expect(screen.getByText(mockUserAgent.browser)).toBeInTheDocument();

    expect(screen.getByText("Engine")).toBeInTheDocument();
    expect(screen.getByText(mockUserAgent.engine)).toBeInTheDocument();

    expect(screen.getByText("OS")).toBeInTheDocument();
    expect(screen.getByText(mockUserAgent.os)).toBeInTheDocument();

    expect(screen.getByText("Device")).toBeInTheDocument();
    expect(screen.getByText(mockUserAgent.device)).toBeInTheDocument();

    const copyButtons = screen.getAllByTestId("copy-button");
    expect(copyButtons).toHaveLength(4); // One for each user agent field
  });

  it("copies the correct text when Copy buttons are clicked", async () => {
    render(<ParserUserAgentResult userAgent={mockUserAgent} />);

    const copyButtons = screen.getAllByTestId("copy-button");
    expect(copyButtons).toHaveLength(4);

    await userEvent.click(copyButtons[0]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockUserAgent.browser,
    );

    await userEvent.click(copyButtons[1]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockUserAgent.engine,
    );

    await userEvent.click(copyButtons[2]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockUserAgent.os,
    );

    await userEvent.click(copyButtons[3]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      mockUserAgent.device,
    );
  });
});
