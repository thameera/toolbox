import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ReferenceContainer(): JSX.Element {
  return (
    <div>
      <Tabs defaultValue="ascii">
        <TabsList>
          <TabsTrigger value="ascii">ASCII Chart</TabsTrigger>
          <TabsTrigger value="http">HTTP Status Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="ascii">
          <div>TODO</div>
        </TabsContent>
        <TabsContent value="http">
          <div>TODO</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
