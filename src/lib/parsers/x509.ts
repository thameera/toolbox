import { IParsedX509Cert } from "./types";
import { Buffer } from "buffer/index.js";
import * as asn1js from "asn1js";
import * as pkijs from "pkijs";

const convertToPem = (key: string): string => {
  const base64Key = key.match(/.{1,64}/g)?.join("\n") ?? "";
  return `-----BEGIN PUBLIC KEY-----\n${base64Key}\n-----END PUBLIC KEY-----`;
};

export function parseX509Cert(str: string): IParsedX509Cert | null {
  try {
    const match = str.match(
      /-----BEGIN CERTIFICATE-----(.*)-----END CERTIFICATE-----/s,
    );
    if (!match) {
      return null;
    }

    const pem = str.replace(/(-----(BEGIN|END) CERTIFICATE-----|\s)/g, "");
    const der = Buffer.from(pem, "base64");
    const asn1 = asn1js.fromBER(der.buffer);
    const cert = new pkijs.Certificate({ schema: asn1.result });

    const subject = cert.subject.typesAndValues
      .map((r) => r.value.valueBlock.value)
      .join(", ");
    const issuer = cert.issuer.typesAndValues
      .map((r) => r.value.valueBlock.value)
      .join(", ");
    const validFrom = cert.notBefore.value.toLocaleString();
    const validTo = cert.notAfter.value.toLocaleString();
    const publicKey =
      cert.subjectPublicKeyInfo.parsedKey?.toString("base64") || "";

    return {
      type: "x509cert",
      subject,
      issuer,
      validFrom,
      validTo,
      pem,
      publicKey: convertToPem(publicKey),
    };
  } catch (e) {
    return null;
  }
}
