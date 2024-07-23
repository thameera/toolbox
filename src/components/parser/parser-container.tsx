import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { ParserColumn, ParserColumnRef } from "./parser-column";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { randomParserExample } from "@/lib/parsers/random-example";

export function ParserContainer(): JSX.Element {
  const [twoColumns, setTwoColumns] = useState(true);

  const parserColumnRef = useRef<ParserColumnRef>(null);

  const showRandomExample = () => {
    const example = randomParserExample();
    parserColumnRef.current?.setTextInput(example);
  };

  const toggleColumns = () => {
    setTwoColumns((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex">
          <Button variant="outline" className="p-2" onClick={showRandomExample}>
            Random example
          </Button>
        </div>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="p-2" onClick={toggleColumns}>
                {twoColumns ? (
                  <ChevronDoubleRightIcon className="w-4 h-4" />
                ) : (
                  <ChevronDoubleLeftIcon className="w-4 h-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {twoColumns ? "Hide second column" : "Show second column"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-row">
        <div className={`pr-2 ${twoColumns ? "w-1/2" : "w-full"}`}>
          <ParserColumn ref={parserColumnRef} />
        </div>
        <div
          className={`transition-width duration-300 pl-2 ${twoColumns ? "w-1/2" : "w-0 hidden"}`}
        >
          <ParserColumn />
        </div>
      </div>
    </div>
  );
}
