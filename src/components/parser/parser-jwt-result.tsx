import { IParsedJWT } from "@/lib/parsers/types";
import CodeView from "../codeview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyButton } from "@/components/copy-button";

interface ParserJWTResultProps {
  jwt: IParsedJWT;
}

const timestampToISO = (timestamp: number): string => {
  return new Date(timestamp * 1000).toISOString();
};

const JSONView = ({ jwt }: ParserJWTResultProps): JSX.Element => {
  return (
    <div>
      <div className="font-bold mt-2">Header</div>
      <CodeView code={JSON.stringify(jwt.header, null, 2)} language="json" />
      <div className="font-bold mt-2">Payload</div>
      <CodeView code={JSON.stringify(jwt.payload, null, 2)} language="json" />
    </div>
  );
};

const renderRow = (label: string, value: any): JSX.Element => {
  let displayValue: string;
  if (typeof value === "object" || Array.isArray(value)) {
    displayValue = JSON.stringify(value);
  } else {
    displayValue = String(value);
  }

  // Display the human-readable time as a tooltip in timestamp claims
  const timestampClaims = ["exp", "nbf", "iat", "auth_time"];
  let valueElem: JSX.Element = <>{displayValue}</>;
  if (timestampClaims.includes(label)) {
    valueElem = (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="border-b border-dotted border-current">
              {value}
            </span>
          </TooltipTrigger>
          <TooltipContent side="right">{timestampToISO(value)}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TableRow key={label}>
      <TableCell className="w-[150px] sm:w-[300px] truncate max-w-[150px] sm:max-w-[300px]">
        <span className="truncate">{label}</span>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <CopyButton className="mr-2 flex-shrink-0" text={displayValue} />
          <span className="truncate">{valueElem}</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

const TableView = ({ jwt }: ParserJWTResultProps): JSX.Element => {
  return (
    <div>
      <div className="font-bold mt-2">Header</div>
      <Table>
        <TableBody>
          {Object.entries(jwt.header).map(([key, value]) =>
            renderRow(key, value),
          )}
        </TableBody>
      </Table>
      <div className="font-bold mt-2">Payload</div>
      <Table>
        <TableBody>
          {Object.entries(jwt.payload).map(([key, value]) =>
            renderRow(key, value),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export function ParserJWTResult({ jwt }: ParserJWTResultProps): JSX.Element {
  return (
    <div>
      <div className="font-bold text-xl">JWT</div>
      <Tabs defaultValue="json" className="mt-4">
        <TabsList>
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <TabsContent value="json">
          <JSONView jwt={jwt} />
        </TabsContent>
        <TabsContent value="table">
          <TableView jwt={jwt} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
