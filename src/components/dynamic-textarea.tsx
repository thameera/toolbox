import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";

interface DynamicTextareaProps {
  placeholder?: string;
  onChange?: (text: string) => void;
  value?: string;
  readOnly?: boolean;
  copyable?: boolean;
  isMonoSpace?: boolean;
}

export function DynamicTextarea({
  placeholder,
  onChange: onChangeCallback,
  value: initialValue = "",
  readOnly,
  copyable,
  isMonoSpace,
}: DynamicTextareaProps): JSX.Element {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (readOnly) {
      return;
    }

    const newValue = event.target.value;
    setValue(newValue);
    if (onChangeCallback) {
      onChangeCallback(newValue);
    }
  };

  const onFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    event.target.select();
  };

  return (
    <div className="relative">
      {copyable && (
        <div className="absolute top-1 right-1 z-10">
          <CopyButton text={value} />
        </div>
      )}
      <Textarea
        placeholder={placeholder || ""}
        rows={5}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        readOnly={readOnly}
        className={isMonoSpace ? "font-mono" : ""}
      />
    </div>
  );
}
