import { Textarea } from "@/components/ui/textarea";

interface DynamicTextareaProps {
  placeholder: string;
  onChange: (text: string) => void;
}

export function DynamicTextarea({
  onChange: onChangeCallback,
  placeholder,
}: DynamicTextareaProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeCallback(event.target.value);
  };

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    event.target.select();
  };

  return (
    <Textarea
      placeholder={placeholder || ""}
      rows={5}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
}
