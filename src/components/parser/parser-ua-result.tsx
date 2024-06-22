import { IParsedUserAgent } from "@/lib/parsers/types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/copy-button";

interface ParserUserAgentResultProps {
  userAgent: IParsedUserAgent;
}

export function ParserUserAgentResult({
  userAgent,
}: ParserUserAgentResultProps): JSX.Element {
  const renderRow = (label: string, value: string): JSX.Element => {
    return (
      <TableRow key={label}>
        <TableCell className="w-[150px] sm:w-[300px]">{label}</TableCell>
        <TableCell>
          <CopyButton className="mr-2" text={value} /> {value}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <div className="font-bold text-xl">User Agent</div>
      <Table>
        <TableBody>
          {renderRow("Browser", userAgent.browser)}
          {renderRow("OS", userAgent.os)}
          {renderRow("Device", userAgent.device)}
        </TableBody>
      </Table>
    </>
  );
}
