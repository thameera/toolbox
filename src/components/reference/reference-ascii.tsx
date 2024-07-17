import { Ascii } from "@/lib/reference/ascii";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AsciiTable(): JSX.Element {
  return (
    <div>
      <Table className="sm:w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead>Dec</TableHead>
            <TableHead>Hex</TableHead>
            <TableHead>Bin</TableHead>
            <TableHead>Character</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Ascii.map((row) => (
            <TableRow key={row.dec}>
              <TableCell>{row.dec}</TableCell>
              <TableCell>{row.hex}</TableCell>
              <TableCell>{row.bin}</TableCell>
              <TableCell>{row.character}</TableCell>
              <TableCell>{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
