import { IParsedJWT } from "@/lib/parsers/types";
import CodeView from "../codeview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <TabsContent value="table">TODO</TabsContent>
      </Tabs>
    </div>
  );
}
