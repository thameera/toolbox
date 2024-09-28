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
  // URL
  {
    type: "url",
    input: "https://example.com/path?foo=bar&baz=qux",
    title: "URL",
    data: "example.com",
  },
  // Text
  {
    type: "text",
    input: "Hello, World!",
    title: "Text",
    data: "Words: 2",
  },
  // JWT
  {
    type: "jwt",
    input:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Buci5wYXduZWUuaW4uZ292LyIsInN1YiI6InJvbl9zd2Fuc29uIiwiZGVwdCI6IlBhcmtzICYgUmVjIiwicm9sZXMiOlsiZGlyZWN0b3IiXSwiaGF0ZXNHb3Z0Ijp0cnVlLCJpYXQiOjE3MjE2NTUzNjksImV4cCI6MTcyMTY3NTM2OSwiYXpwIjoicGFya3MtY2xpZW50Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSJ9.Jz7Xm0SWdmbRyTUwxa9Aa41azGRkSReb4MkfBtjeYp8",
    title: "JWT",
    data: "HS256",
  },
];

describe("ParserColumn", () => {
  sampleInputs.forEach(({ type, input, title, data }: SampleInput) => {
    it(`renders parsed output for type ${type}`, async () => {
      const ref = { current: null as ParserColumnRef | null };
      render(<ParserColumn ref={ref} />);

      // Input text
      const textInput = screen.getByRole("textbox");
      await userEvent.click(textInput);
      await userEvent.paste(input);

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
