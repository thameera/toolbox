import { Textarea } from "@/components/ui/textarea";

interface DynamicTextareaProps {
  placeholder?: string;
  onChange?: (text: string) => void;
  value?: string;
  readOnly?: boolean;
}

export function DynamicTextarea({
  placeholder,
  onChange: onChangeCallback,
  value,
  readOnly,
}: DynamicTextareaProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChangeCallback) {
      onChangeCallback(event.target.value);
    }
  };

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    event.target.select();
  };

  return (
    <Textarea
      placeholder={placeholder || ""}
      rows={5}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      readOnly={readOnly}
    />
  );
}
