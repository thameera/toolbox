import { Textarea } from "@/components/ui/textarea";

interface DiffTextareaProps {
  onChange: (text: string) => void;
}

export function DiffTextarea({
  onChange: onChangeCallback,
}: DiffTextareaProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCallback(event.target.value);
  };

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    event.target.select();
  };

  return (
    <Textarea
      placeholder="Paste text or JSON"
      rows={5}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
}
