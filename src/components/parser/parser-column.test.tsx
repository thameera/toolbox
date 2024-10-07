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
  // JSON
  {
    type: "json",
    input: '{"foo": "bar"}',
    title: "JSON Object",
    data: '"foo": "bar"',
  },
  /* TODO test JSON Array */
  // XML
  {
    type: "xml",
    input:
      '<?xml version="1.0" encoding="UTF-8"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don\'t forget me this weekend!</body></note>',
    title: "XML",
    data: "<to>Tove</to>",
  },
  // User-Agent
  {
    type: "ua",
    input:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    title: "User Agent",
    data: "Chrome 126",
  },
  // Base64 json
  {
    type: "base64json",
    input: "eyJyZXR1cm5UbyI6ICJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ==",
    title: "Base64-encoded JSON",
    data: '"returnTo": "http://localhost:3000"',
  },
  // X509 certs
  {
    type: "x509cert",
    input:
      "MIIC5DCCAcygAwIBAgIJGFvVaEzVIPcQMA0GCSqGSIb3DQEBBQUAMBkxFzAVBgNVBAMTDnRoYW0uYXV0aDAuY29tMB4XDTE2MDQyMTA2NTY0MFoXDTI5MTIyOTA2NTY0MFowGTEXMBUGA1UEAxMOdGhhbS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIa7050W/GB1HBDMb+O+Mivgh01GA2SN2yqmhozQC9ih7mCnEzEaRNolP2vmi4AAG4o2Vf1JK2kzyRPiDgC+dWT/RmLg0e0WHxQkHWlVyFDU73s//VIjhTxjZ1RpyKAlv2hVDN+tYimn81jlVNAsZI97zgUTna9I38vMQ+oatJWF48LlyYittQGXOK91K50YLXj5XW5K2N/Rke5GBXowlmJsSplbjyIrNN2AFWnNjGVyE/a6bf5eLiMeeGgOcr8f/oNH5xZs1K7Cqp2WeIv3uCLMKUo/DedD6SIq9SIrqT4Ls1Ijieacq8eD3kNAt7+k+6gNagezT5d0nYSKKn3jEZAgMBAAGjLzAtMAwGA1UdEwQFMAMBAf8wHQYDVR0OBBYEFGbP8T3m3/Ox79wZgGg8h8lNJcE1MA0GCSqGSIb3DQEBBQUAA4IBAQAs0sVgota1I8yacZ9epWS4os+DEPIvja1poewaxD7sWHntRcbYh75zliQAfoPTxRWdUP746NLoBAiqWr93ccHt5zBrgxH1nRsr2nHxK1yyzKlgsMSzrcjS6+RNYcLYrGdO16NEftQUeJOOVE82/udxNYNhoxc5RpyzDrSc6FL5zhdgyhvIbO/Kk6I0ogTJVemLzdGw+PhBSwgKjHfHEKBWeOpi33HOrgcd5+jMmouK7gSPeg2TuzYE77tKO18pA9yUF0wxN926VKPrMWJU7G6UnQ7GG6P46jjfLU5x9DHzdKHV06e1HhncEEjDTllj8/qeZrbgCKN4R540lxJW9fcJ",
    title: "X.509 Certificate",
    data: "CN=tham.auth0.com",
  },
  // Math expression
  {
    type: "math-expr",
    input: "42*84+2",
    title: "Math expression",
    data: "3530",
  },
  // None
  {
    type: "",
    input: "",
    title: "Supports these formats:",
    data: "URLs",
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
