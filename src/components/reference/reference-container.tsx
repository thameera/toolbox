import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AsciiTable from "./reference-ascii";
import ReferenceHttpStatuses from "./reference-http-statuses";

export function ReferenceContainer(): JSX.Element {
  return (
    <div>
      <Tabs defaultValue="ascii">
        <TabsList>
          <TabsTrigger value="ascii">ASCII Chart</TabsTrigger>
          <TabsTrigger value="http">HTTP Status Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="ascii">
          <AsciiTable />
        </TabsContent>
        <TabsContent value="http">
          <ReferenceHttpStatuses />
        </TabsContent>
      </Tabs>
    </div>
  );
}
