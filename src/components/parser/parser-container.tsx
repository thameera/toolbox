import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ParserColumn, ParserColumnRef } from "./parser-column";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { randomParserExample } from "@/lib/parsers/random-example";

export function ParserContainer(): JSX.Element {
  const [columnsVisibility, setColumnsVisibility] = useState([
    true,
    true,
    false,
    false,
  ]);

  const parserColumnRef = useRef<ParserColumnRef>(null);

  const showRandomExample = () => {
    const example = randomParserExample();
    parserColumnRef.current?.setTextInput(example);
  };

  const toggleColumn = (index: number) => {
    if (index === 0) return; // First column cannot be turned off
    setColumnsVisibility((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const visibleColumnsCount = columnsVisibility.filter(Boolean).length;
  const columnWidthClass = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
  }[visibleColumnsCount];

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="p-2"
                  onClick={showRandomExample}
                >
                  Random example
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Keep clicking to see random examples
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex space-x-2 items-center">
          {[1, 2, 3, 4].map((num) => (
            <TooltipProvider delayDuration={200} key={num}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Toggle
                      pressed={columnsVisibility[num - 1]}
                      onPressedChange={() => toggleColumn(num - 1)}
                      disabled={num === 1}
                    >
                      {num}
                    </Toggle>
                  </div>
                </TooltipTrigger>
                {num === 1 ? null : (
                  <TooltipContent>Toggle column {num}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <div className="flex flex-row">
        <div
          className={`pr-2 ${columnsVisibility[0] ? columnWidthClass : "w-0 invisible"}`}
        >
          <ParserColumn ref={parserColumnRef} />
        </div>
        <div
          className={`transition-width duration-100 px-2 ${columnsVisibility[1] ? columnWidthClass : "w-0 px-0 invisible"}`}
        >
          <ParserColumn />
        </div>
        <div
          className={`transition-width duration-100 px-2 ${columnsVisibility[2] ? columnWidthClass : "w-0 px-0 invisible"}`}
        >
          <ParserColumn />
        </div>
        <div
          className={`transition-width duration-100 pl-2 ${columnsVisibility[3] ? columnWidthClass : "w-0 pl-0 invisible"}`}
        >
          <ParserColumn />
        </div>
      </div>
    </div>
  );
}
