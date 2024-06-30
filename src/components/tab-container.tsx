"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParserContainer } from "./parser/parser-container";

export default function TabContainer(): JSX.Element {
  return (
    <Tabs defaultValue="parser">
      <TabsList>
        <TabsTrigger value="parser">Parser</TabsTrigger>
        <TabsTrigger value="converter">Converter</TabsTrigger>
        <TabsTrigger value="diff">Diff</TabsTrigger>
        <TabsTrigger value="ref">Reference</TabsTrigger>
      </TabsList>
      <TabsContent value="parser">
        <ParserContainer />
      </TabsContent>
      <TabsContent value="converter">TODO</TabsContent>
      <TabsContent value="diff">TODO</TabsContent>
      <TabsContent value="ref">TODO</TabsContent>
    </Tabs>
  );
}
