import { render, screen, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { ConverterButtons } from "./conv-buttons";

describe("ConverterButtons", () => {
  const mockConvertCallback = jest.fn();

  beforeEach(() => {
    mockConvertCallback.mockClear();
  });

  it("renders all button sections", () => {
    render(<ConverterButtons convertCallback={mockConvertCallback} />);

    // Check section headings
    expect(screen.getByText("Web Encodings")).toBeInTheDocument();
    expect(screen.getByText("Text Converters")).toBeInTheDocument();
    expect(screen.getByText("Time Converters")).toBeInTheDocument();
    expect(screen.getByText("Miscellaneous")).toBeInTheDocument();
  });

  it("calls convertCallback with correct taskId when web encoding buttons are clicked", async () => {
    render(<ConverterButtons convertCallback={mockConvertCallback} />);

    // Test Base64 buttons
    await userEvent.click(screen.getByText("Base64 Encode"));
    expect(mockConvertCallback).toHaveBeenCalledWith("base64_encode");

    await userEvent.click(screen.getByText("Base64 Decode"));
    expect(mockConvertCallback).toHaveBeenCalledWith("base64_decode");

    // Test URL buttons
    await userEvent.click(screen.getByText("URL Encode"));
    expect(mockConvertCallback).toHaveBeenCalledWith("url_encode");

    await userEvent.click(screen.getByText("URL Decode"));
    expect(mockConvertCallback).toHaveBeenCalledWith("url_decode");

    // Test HTML buttons
    await userEvent.click(screen.getByText("HTML Encode"));
    expect(mockConvertCallback).toHaveBeenCalledWith("html_encode");

    await userEvent.click(screen.getByText("HTML Decode"));
    expect(mockConvertCallback).toHaveBeenCalledWith("html_decode");
  });

  it("handles text replacement functionality correctly", async () => {
    render(<ConverterButtons convertCallback={mockConvertCallback} />);

    // Get input fields and replace button
    const replaceInput = screen.getByPlaceholderText("replace");
    const withInput = screen.getByPlaceholderText("with");
    const replaceButton = screen.getByText("Replace");

    // Input test values
    await userEvent.type(replaceInput, "hello");
    await userEvent.type(withInput, "world");

    // Click replace button
    await userEvent.click(replaceButton);

    // Verify callback was called with correct data
    expect(mockConvertCallback).toHaveBeenCalledWith("text_replace", {
      replace: "hello",
      with: "world",
    });
  });

  it("calls convertCallback with correct taskId for time converter buttons", async () => {
    render(<ConverterButtons convertCallback={mockConvertCallback} />);

    // Find the sections by their headings
    const convertFromSection = screen.getByText("Convert from").parentElement;
    const currentTimeSection = screen.getByText("Current time").parentElement;

    expect(convertFromSection).not.toBeNull();
    expect(currentTimeSection).not.toBeNull();

    if (!convertFromSection || !currentTimeSection) {
      throw new Error("Required sections not found");
    }

    // Test Unix time conversion buttons in "Convert from" section
    await userEvent.click(within(convertFromSection).getByText("Unix seconds"));
    expect(mockConvertCallback).toHaveBeenCalledWith("format_date_from_unix_s");

    await userEvent.click(within(convertFromSection).getByText("Unix millis"));
    expect(mockConvertCallback).toHaveBeenCalledWith(
      "format_date_from_unix_ms",
    );

    // Test current time buttons
    await userEvent.click(within(currentTimeSection).getByText("Formatted"));
    expect(mockConvertCallback).toHaveBeenCalledWith(
      "current_time_formatted_local",
    );

    await userEvent.click(
      within(currentTimeSection).getByText("Formatted UTC"),
    );
    expect(mockConvertCallback).toHaveBeenCalledWith(
      "current_time_formatted_utc",
    );

    await userEvent.click(within(currentTimeSection).getByText("Unix seconds"));
    expect(mockConvertCallback).toHaveBeenCalledWith("current_time_unix_s");

    await userEvent.click(within(currentTimeSection).getByText("Unix millis"));
    expect(mockConvertCallback).toHaveBeenCalledWith("current_time_unix_ms");
  });

  it("calls convertCallback with correct taskId for miscellaneous buttons", async () => {
    render(<ConverterButtons convertCallback={mockConvertCallback} />);

    await userEvent.click(screen.getByText("UUID"));
    expect(mockConvertCallback).toHaveBeenCalledWith("generate_uuid");

    await userEvent.click(screen.getByText("Coin Toss"));
    expect(mockConvertCallback).toHaveBeenCalledWith("coin_toss");

    await userEvent.click(screen.getByText("Dice Roll"));
    expect(mockConvertCallback).toHaveBeenCalledWith("dice_roll");
  });
});
