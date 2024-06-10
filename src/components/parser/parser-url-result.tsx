import { IParsedURL } from "@/lib/parsers/types";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { CopyButton } from "@/components/copy-button";

interface ParserURLResultProps {
  url: IParsedURL;
}

export function ParserURLResult({ url }: ParserURLResultProps): JSX.Element {
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
      <h2>Parsed URL</h2>
      <Table>
        <TableBody>
          {url.protocol && renderRow("Protocol", url.protocol)}
          {url.host && renderRow("Host", url.host)}
          {url.port && renderRow("Port", url.port)}
          {url.path && renderRow("Path", url.path)}
          {url.username && renderRow("Username", url.username)}
          {url.password && renderRow("Password", url.password)}
        </TableBody>
      </Table>

      {Object.keys(url.query).length > 0 && (
        <>
          <div className="font-bold mt-2">Query params</div>
          <Table>
            <TableBody>
              {Object.entries(url.query).map(([key, value]) =>
                renderRow(key, value),
              )}
            </TableBody>
          </Table>
        </>
      )}

      {Object.keys(url.hash).length > 0 && (
        <>
          <div className="font-bold mt-2">Hash params</div>
          <Table>
            <TableBody>
              {Object.entries(url.hash).map(([key, value]) =>
                renderRow(key, value),
              )}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
