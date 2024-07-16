import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col items-center sm:space-x-2 space-y-4">
      <div className="flex flex-col gap-8 w-full sm:w-auto">
        {/* Start of button sets */}
        {/* Web Encodings */}
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Web Encodings</div>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <ConvButton taskId="base64_encode" label="Base64 Encode" />
            <ConvButton taskId="base64_decode" label="Base64 Decode" />
            <ConvButton taskId="url_encode" label="URL Encode" />
            <ConvButton taskId="url_decode" label="URL Decode" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <ConvButton taskId="html_encode" label="HTML Encode" />
            <ConvButton taskId="html_decode" label="HTML Decode" />
          </div>
        </div>

        {/* Time converters */}
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Time Conversion</div>
          <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap">
            <span className="sm:w-auto w-full text-center">Convert from</span>
            <ConvButton taskId="format_date_from_unix_s" label="Unix seconds" />
            <ConvButton taskId="format_date_from_unix_ms" label="Unix millis" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 flex-wrap">
            <span className="sm:w-auto w-full text-center">Current time</span>
            <ConvButton
              taskId="current_time_formatted_local"
              label="Formatted"
            />
            <ConvButton
              taskId="current_time_formatted_utc"
              label="Formatted UTC"
            />
            <ConvButton taskId="current_time_unix_s" label="Unix seconds" />
            <ConvButton taskId="current_time_unix_ms" label="Unix millis" />
          </div>
        </div>

        {/* Misc converters */}
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Miscellaneous</div>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <ConvButton taskId="generate_uuid" label="UUID" />
            <ConvButton taskId="coin_toss" label="Coin Toss" />
            <ConvButton taskId="dice_roll" label="Dice Roll" />
          </div>
        </div>
        {/* End of button sets */}
      </div>
    </div>
  );
}
