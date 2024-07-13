import { Button } from "../ui/button";

interface ConverterButtonsProps {
  convertCallback: (taskId: string) => void;
}

export function ConverterButtons({
  convertCallback,
}: ConverterButtonsProps): JSX.Element {
  const ConvButton = ({ taskId, label }: { taskId: string; label: string }) => {
    return <Button onClick={() => convertCallback(taskId)}>{label}</Button>;
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col gap-2">
        <div className="font-semibold">Web Encodings</div>
        <div>
          <ConvButton taskId="base64_encode" label="Base64 Encode" />
        </div>
      </div>
    </div>
  );
}
