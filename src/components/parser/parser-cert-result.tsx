import { IParsedX509Cert } from "@/lib/parsers/types";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CopyButton } from "../copy-button";
import { DynamicTextarea } from "../dynamic-textarea";

interface ParserCertResultProps {
  cert: IParsedX509Cert;
}

export function ParserCertResult({ cert }: ParserCertResultProps): JSX.Element {
  const renderRow = (label: string, value: string): JSX.Element => {
    return (
      <TableRow key={label}>
        <TableCell className="w-[150px] sm:w-[300px]">{label}</TableCell>
        <TableCell className="overflow-x-auto whitespace-nowrap">
          <CopyButton className="mr-2" text={value} /> {value}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <div className="font-bold text-xl">X.509 Certificate</div>
      <Table>
        <TableBody>
          {renderRow("Version", cert.version)}
          {renderRow("Subject", cert.subject)}
          {renderRow("Issuer", cert.issuer)}
          {renderRow("Valid From", cert.validFrom)}
          {renderRow("Valid To", cert.validTo)}
          {renderRow("Serial Number", cert.serialNumber)}
          {renderRow("Algorithm", cert.algorithm)}
          {renderRow("Thumbprint", cert.thumbprint)}
        </TableBody>
      </Table>
      <div className="font-bold mt-4">PEM-formatted certificate</div>
      <DynamicTextarea
        value={cert.pem.trim()}
        readOnly={true}
        copyable={true}
      />
      <div className="font-bold mt-4">Public Key</div>
      <DynamicTextarea
        value={cert.publicKey.trim()}
        readOnly={true}
        copyable={true}
      />
    </>
  );
}
