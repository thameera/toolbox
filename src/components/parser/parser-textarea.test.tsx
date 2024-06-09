import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ParserTextarea } from "./parser-textarea";

describe("ParserTextarea", () => {
  it("renders textarea with placeholder", () => {
    render(<ParserTextarea onChange={() => {}} />);

    const textarea = screen.getByPlaceholderText("Paste something here");

    expect(textarea).toBeInTheDocument();
  });

  it("calls onChange callback with textarea value", () => {
    const onChangeMock = jest.fn();
    render(<ParserTextarea onChange={onChangeMock} />);

    const textarea = screen.getByPlaceholderText("Paste something here");
    fireEvent.change(textarea, { target: { value: "some text" } });

    expect(onChangeMock).toHaveBeenCalledWith("some text");
  });
});
