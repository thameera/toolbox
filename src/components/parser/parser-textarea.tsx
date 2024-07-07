import { Textarea } from "../ui/textarea";

interface ParserTextareaProps {
  onChange: (text: string) => void;
}

export function ParserTextarea({
  onChange: onChangeCallback,
}: ParserTextareaProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCallback(event.target.value);
  };

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    event.target.select();
  };

  return (
    <Textarea
      placeholder="Paste something here"
      rows={5}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
}
