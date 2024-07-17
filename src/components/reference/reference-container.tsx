import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReferenceAsciiTable from "./reference-ascii";
import ReferenceHttpStatuses from "./reference-http-statuses";

export function ReferenceContainer(): JSX.Element {
  return (
    <div>
      <Tabs defaultValue="http">
        <TabsList>
          <TabsTrigger value="http">HTTP Status Codes</TabsTrigger>
          <TabsTrigger value="ascii">ASCII Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="http">
          <ReferenceHttpStatuses />
        </TabsContent>
        <TabsContent value="ascii">
          <ReferenceAsciiTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
