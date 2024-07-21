import { IParsedX509Cert } from "./types";
import { pki } from "node-forge";

const createCNStr = (obj: any) =>
  obj.attributes
    .map((attr: any) => [attr.shortName, attr.value].join("="))
    .join(", ");

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

    return {
      type: "x509cert",
      subject,
      issuer,
      validFrom,
      validTo,
      pem,
      publicKey,
    };
  } catch (e) {
    return null;
  }
}
