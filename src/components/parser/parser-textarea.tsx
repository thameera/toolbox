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

  return (
    <div>
      <Textarea placeholder="Paste something here" onChange={handleChange} />
    </div>
  );
}
