import { IParsedJWT } from "@/lib/parsers/types";
import CodeView from "../codeview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/copy-button";

interface ParserJWTResultProps {
  jwt: IParsedJWT;
}

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
  return (
    <TableRow key={label}>
      <TableCell className="w-[150px] sm:w-[300px]">{label}</TableCell>
      <TableCell>
        <CopyButton className="mr-2" text={displayValue} /> {displayValue}
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
