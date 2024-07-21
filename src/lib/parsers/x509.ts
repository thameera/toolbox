import { IParsedX509Cert } from "./types";
import forge, { pki } from "node-forge";

const createCNStr = (obj: any) =>
  obj.attributes
    .map((attr: any) => [attr.shortName, attr.value].join("="))
    .join(", ");

const getThumbprint = (cert: pki.Certificate): string => {
  const md = forge.md.sha1.create();
  md.update(forge.asn1.toDer(pki.certificateToAsn1(cert)).getBytes());
  return md.digest().toHex().toUpperCase();
};

export function parseX509Cert(str: string): IParsedX509Cert | null {
  try {
    const match = str.match(
      /-----BEGIN CERTIFICATE-----(.*)-----END CERTIFICATE-----/s,
    );
    if (!match) {
      return null;
    }

    const pem = str;
    const cert = pki.certificateFromPem(pem);

    const subject = createCNStr(cert.subject);
    const issuer = createCNStr(cert.issuer);
    const validFrom = cert.validity.notBefore.toISOString();
    const validTo = cert.validity.notAfter.toISOString();
    const publicKey = pki.publicKeyToPem(cert.publicKey);
    const version = `${cert.version + 1} (0x${cert.version.toString(16)})`;
    const serialNumber = cert.serialNumber;
    const algorithm = pki.oids[cert.signatureOid];
    const thumbprint = getThumbprint(cert);

    return {
      type: "x509cert",
      subject,
      issuer,
      validFrom,
      validTo,
      version,
      serialNumber,
      algorithm,
      thumbprint,
      pem,
      publicKey,
    };
  } catch (e) {
    return null;
  }
}
