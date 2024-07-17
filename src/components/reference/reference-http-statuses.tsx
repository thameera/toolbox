import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HttpStatuses } from "@/lib/reference/http-statuses";

export default function ReferenceHttpStatuses(): JSX.Element {
  return (
    <div>
      <Table className="sm:w-[400px]">
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {HttpStatuses.map((row) => (
            <TableRow
              key={row.code}
              className={row.heading ? "border-t bg-muted/50 font-medium" : ""}
            >
              <TableCell>
                {row.heading ? (
                  row.code
                ) : (
                  <a
                    href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${row.code}`}
                    target="_blank"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    {row.code}
                  </a>
                )}
              </TableCell>
              <TableCell>{row.msg}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
