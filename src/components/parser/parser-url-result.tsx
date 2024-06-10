import { IParsedURL } from "@/lib/parsers/types";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

interface ParserURLResultProps {
  url: IParsedURL;
}

export function ParserURLResult({ url }: ParserURLResultProps): JSX.Element {
  const renderRow = (label: string, value: string): JSX.Element => {
    if (!value) return <></>;
    return (
      <TableRow>
        <TableCell className="w-[150px] sm:w-[300px]">{label}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <h2>Parsed URL</h2>
      <Table>
        <TableBody>
          {renderRow("Protocol", url.protocol)}
          {renderRow("Host", url.host)}
          {renderRow("Port", url.port)}
          {renderRow("Path", url.path)}
          {renderRow("Username", url.username)}
          {renderRow("Password", url.password)}
        </TableBody>
      </Table>
    </>
  );
}
