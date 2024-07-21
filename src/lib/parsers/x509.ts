import { IParsedX509Cert } from "./types";
import { pki, md } from "node-forge";

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
    const version = `${cert.version + 1} (0x${cert.version.toString(16)})`;
    const serialNumber = cert.serialNumber;
    const algorithm = pki.oids[cert.signatureOid];
    const thumbprint = pki.getPublicKeyFingerprint(cert.publicKey, {
      encoding: "hex",
      md: md.sha1.create(),
    });

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
