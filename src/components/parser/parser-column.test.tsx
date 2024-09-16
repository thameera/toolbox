import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { ParserColumn, ParserColumnRef } from "./parser-column";

// Mocking clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve()),
  },
});

type SampleInput = {
  type: string;
  input: string;
  title: string;
  data: string;
};
const sampleInputs = [
  {
    type: "url",
    input: "https://example.com/path?foo=bar&baz=qux",
    title: "URL",
    data: "example.com",
  },
];

describe("ParserColumn", () => {
  sampleInputs.forEach(({ type, input, title, data }: SampleInput) => {
    it(`renders parsed output for type ${type}`, async () => {
      const ref = { current: null as ParserColumnRef | null };
      render(<ParserColumn ref={ref} />);

      // Input text
      const textInput = screen.getByRole("textbox");
      userEvent.type(textInput, input);

      // Wait for the input to be typed
      await waitFor(() => {
        expect(textInput).toHaveValue(input);
      });

      // Wait for the right parser component to be rendered
      await waitFor(() => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });

      // Verify the parsed data
      const parsedData = screen.getByTestId("parsed-data-container");
      expect(parsedData).toHaveTextContent(data);
    });
  });
});
