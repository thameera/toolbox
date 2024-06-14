import { useState } from "react";
import { Button } from "../ui/button";
import { ParserColumn } from "./parser-column";
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

export function ParserContainer(): JSX.Element {
  const [twoColumns, setTwoColumns] = useState(true);

  const toggleColumns = () => {
    setTwoColumns((prev) => !prev);
  };

  return (
    <div>
      <div className="pl-4 pr-4 flex flex-row-reverse">
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
        <div className={twoColumns ? "w-1/2" : "w-screen"}>
          <ParserColumn />
        </div>
        {twoColumns && (
          <div className="w-1/2">
            <ParserColumn />
          </div>
        )}
      </div>
    </div>
  );
}
