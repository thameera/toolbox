"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParserContainer } from "./parser/parser-container";
import { useState } from "react";
import { DiffContainer } from "./diff/diff-container";
import { ConvContainer } from "./converter/conv-container";
import { ReferenceContainer } from "./reference/reference-container";

export default function TabContainer(): JSX.Element {
  const [activeTab, setActiveTab] = useState("parser");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs defaultValue="parser" onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="parser">Parser</TabsTrigger>
        <TabsTrigger value="converter">Converter</TabsTrigger>
        <TabsTrigger value="diff">Diff</TabsTrigger>
        <TabsTrigger value="ref">Reference</TabsTrigger>
      </TabsList>
      <TabsContent
        value="parser"
        forceMount
        className={activeTab === "parser" ? "" : "hidden"}
      >
        <ParserContainer />
      </TabsContent>
      <TabsContent
        value="converter"
        forceMount
        className={activeTab === "converter" ? "" : "hidden"}
      >
        <ConvContainer />
      </TabsContent>
      <TabsContent
        value="diff"
        forceMount
        className={activeTab === "diff" ? "" : "hidden"}
      >
        <DiffContainer />
      </TabsContent>
      <TabsContent
        value="ref"
        forceMount
        className={activeTab === "ref" ? "" : "hidden"}
      >
        <ReferenceContainer />
      </TabsContent>
    </Tabs>
  );
}
