import { IParsedJSON } from "@/lib/parsers/types";
import CodeView from "../codeview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/copy-button";

interface ParserJSONResultProps {
  json: IParsedJSON;
}

const renderRow = (label: string, value: any): JSX.Element => {
  let displayValue: string;
  if (typeof value === "object" || Array.isArray(value)) {
    displayValue = JSON.stringify(value);
  } else {
    displayValue = String(value);
  }

  return (
    <TableRow key={label}>
      <TableCell className="w-[150px] sm:w-[300px] truncate max-w-[150px] sm:max-w-[300px]">
        {label}
      </TableCell>
      <TableCell className="w-full">
        <CopyButton className="mr-2 flex-shrink-0" text={displayValue} />
        <span className="truncate">{displayValue}</span>
      </TableCell>
    </TableRow>
  );
};

const TabbedJsonView = ({ json }: ParserJSONResultProps): JSX.Element => {
  return (
    <>
      <div className="font-bold text-xl mb-4">JSON Object</div>
      <Tabs defaultValue="json" className="mt-4">
        <TabsList>
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <TabsContent value="json">
          <CodeView code={JSON.stringify(json.json, null, 2)} language="json" />
        </TabsContent>
        <TabsContent value="table">
          <Table>
            <TableBody>
              {Object.entries(json.json).map(([key, value]) =>
                renderRow(key, value),
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </>
  );
};

export function ParserJSONResult({ json }: ParserJSONResultProps): JSX.Element {
  const title = json.arrLength
    ? `JSON Array (${json.arrLength} items)`
    : "JSON Object";

  /*
   * Show the more sophisticated JSON view only if the JSON is small enough
   * (and not an array)
   */
  if (!json.arrLength && JSON.stringify(json.json, null, 2).length < 10000) {
    return TabbedJsonView({ json });
  }

  return (
    <>
      <div className="font-bold text-xl mb-4">{title}</div>
      <CodeView code={JSON.stringify(json.json, null, 2)} language="json" />
    </>
  );
}
