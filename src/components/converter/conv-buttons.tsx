import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ConverterButtonsProps {
  convertCallback: (taskId: string, data?: Object) => void;
}

export function ConverterButtons({
  convertCallback,
}: ConverterButtonsProps): JSX.Element {
  const [replaceText, setReplaceText] = useState("");
  const [replaceWith, setReplaceWith] = useState("");

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

        {/* Text converters */}
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Text Converters</div>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <ConvButton taskId="text_uppercase" label="To Uppercase" />
            <ConvButton taskId="text_lowercase" label="To Lowercase" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <ConvButton
              taskId="text_replace_n_with_newlines"
              label="Replace \n with newlines"
            />
            <ConvButton
              taskId="text_replace_newlines_with_n"
              label="Replace newlines with \n"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap sm:items-center">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <Input
                className="sm:w-auto"
                placeholder="replace"
                value={replaceText}
                onChange={(e) => {
                  setReplaceText(e.target.value);
                }}
              />
              <Input
                className="sm:w-auto"
                placeholder="with"
                value={replaceWith}
                onChange={(e) => {
                  setReplaceWith(e.target.value);
                }}
              />
              <Button
                className="sm:w-auto"
                onClick={() => {
                  const data = { replace: replaceText, with: replaceWith };
                  convertCallback("text_replace", data);
                }}
              >
                Replace
              </Button>
            </div>
          </div>
        </div>

        {/* Time converters */}
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Time Converters</div>
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
