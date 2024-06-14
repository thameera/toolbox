import { useState } from "react";
import { Button } from "../ui/button";
import { ParserColumn } from "./parser-column";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export function ParserContainer(): JSX.Element {
  const [twoColumns, setTwoColumns] = useState(true);

  const toggleColumns = () => {
    setTwoColumns((prev) => !prev);
  };

  return (
    <div>
      <div className="pl-4 pr-4 flex flex-row-reverse">
        <Button variant="outline" className="p-2" onClick={toggleColumns}>
          {twoColumns ? (
            <ChevronDoubleRightIcon className="w-4 h-4" />
          ) : (
            <ChevronDoubleLeftIcon className="w-4 h-4" />
          )}
        </Button>
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
