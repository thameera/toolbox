const examples = [
  {
    left: "Oh there once was a swagman camped in the billabong\nUnder the shade of a Coolibah tree\nAnd he sang as he looked at the old billy boiling\nWho'll come a waltzing Matilda with me?\n\nWaltzing Matilda, waltzing Matilda\nYou'll come a-waltzing Matilda, with me\nAnd he sang as he watched and waited till his billy boiled:\n\"You'll come a-waltzing Matilda, with me.\"",
    right:
      "Oh there once was a swagman camped in the billabong\nUnder the shade of the coolibah tree\nAnd he sang as he looked at his old billy boiling\nWho'll come a waltzing Matilda with me?\n\nWaltzing Matilda, waltzing Matilda\nWho'll come a-waltzing Matilda, with me?\nAnd he sang as he watched and waited till his billy boiled:\n\"You'll come a-waltzing Matilda, with me.\"",
  },
  {
    left: '{"email":"johndoe@gmail.com","email_verified":true,"updated_at":"2017-11-23T05:34:23.248Z","picture":"https://s.gravatar.com/avatar/86ce735f59af85b35fa7416c4b330452?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fth.png","user_id":"auth0|571dfc872f1d5e56026702f6","name":"johndoe@gmail.com","nickname":"johndoe","identities":[{"user_id":"571dfc872f1d5e56026702f6","provider":"auth0","connection":"Username-Password-Authentication","isSocial":false},{"provider":"google-oauth2","user_id":"google-oauth2|107929228185700012492","connection":"google-oauth2"},{"provider":"twitter","user_id":"twitter|35197594","connection":"twitter"}],"created_at":"2016-04-25T11:16:23.031Z","last_password_reset":"2017-09-21T02:31:16.253Z","user_metadata":{"foo":"bar","hey":"there"},"multifactor":["google-authenticator"],"blocked":false,"app_metadata":{"roles":["admin","boss"],"authorization":{"groups":[]}},"last_ip":"112.134.177.209","last_login":"2017-11-23T05:34:23.248Z","logins_count":769,"blocked_for":[],"guardian_enrollments":[]}',
    right:
      '{"email":"johndoe@gmail.com","email_verified":false,"updated_at":"2017-11-23T05:34:23.248Z","picture":"https://s.gravatar.com/avatar/86ce735f59af85b35fa7416c4b330452?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fth.png","user_id":"auth0|571dfc872f1d5e56026702f6","name":"johndoe@gmail.com","nickname":"johndoe","identities":[{"user_id":"571dfc872f1d5e56026702f6","provider":"auth0","connection":"Username-Password-Authentication","isSocial":false},{"provider":"google-oauth2","user_id":"google-oauth2|107929228185700012492","connection":"google-oauth2"},{"provider":"twitter","user_id":"twitter|35197594","connection":"twitter"}],"created_at":"2016-04-25T11:16:23.031Z","user_metadata":{"foo":"barz","hey":"there"},"multifactor":["google-authenticator"],"blocked":false,"app_metadata":{"roles":["admin","boss"],"authorization":{"groups":[]}},"last_ip":"112.134.177.209","last_login":"2017-11-23T05:21:55.352Z","logins_count":764,"blocked_for":[],"guardian_enrollments":[]}',
  },
  {
    left: 'import { IParsedX509Cert } from "./types";\nimport { pki, md } from "node-forge";\n\nconst createCNStr = (obj: any) =>\n  obj.attributes\n    .map((attr: any) => [attr.shortName, attr.value].join("="))\n    .join(", ");\n\nexport function parseX509Cert(str: string): IParsedX509Cert | null {\n  try {\n    const match = str.match(\n      /-----BEGIN CERTIFICATE-----(.*)-----END CERTIFICATE-----/s,\n    );\n    if (!match) {\n      return null;\n    }\n\n    const pem = str;\n    const cert = pki.certificateFromPem(pem);\n\n    const subject = createCNStr(cert.subject);\n    const issuer = createCNStr(cert.issuer);\n    const validFrom = cert.validity.notBefore.toISOString();\n    const validTo = cert.validity.notAfter.toISOString();\n    const publicKey = pki.publicKeyToPem(cert.publicKey);\n    const version = `${cert.version + 1} (0x${cert.version.toString(16)})`;\n    const serialNumber = cert.serialNumber;\n    const algorithm = pki.oids[cert.signatureOid];\n    const thumbprint = pki.getPublicKeyFingerprint(cert.publicKey, {\n      encoding: "hex",\n      md: md.sha1.create(),\n    });\n\n    return {\n      type: "x509cert",\n      subject,\n      issuer,\n      validFrom,\n      validTo,\n      version,\n      serialNumber,\n      algorithm,\n      thumbprint,\n      pem,\n      publicKey,\n    };\n  } catch (e) {\n    return null;\n  }\n}',
    right:
      'import { IParsedX509Cert } from "./types";\nimport forge, { pki } from "node-forge";\n\nconst createCNStr = (obj: any) =>\n  obj.attributes\n    .map((attr: any) => [attr.shortName, attr.value].join("="))\n    .join(", ");\n\nconst getThumbprint = (cert: pki.Certificate): string => {\n  const md = forge.md.sha1.create();\n  md.update(forge.asn1.toDer(pki.certificateToAsn1(cert)).getBytes());\n  return md.digest().toHex().toUpperCase();\n};\n\nexport function parseX509Cert(str: string): IParsedX509Cert | null {\n  try {\n    const match = str.match(\n      /-----BEGIN CERTIFICATE-----(.*)-----END CERTIFICATE-----/s,\n    );\n    if (!match) {\n      return null;\n    }\n\n    const pem = str;\n    const cert = pki.certificateFromPem(pem);\n\n    const subject = createCNStr(cert.subject);\n    const issuer = createCNStr(cert.issuer);\n    const validFrom = cert.validity.notBefore.toISOString();\n    const validTo = cert.validity.notAfter.toISOString();\n    const publicKey = pki.publicKeyToPem(cert.publicKey);\n    const version = `${cert.version + 1} (0x${cert.version.toString(16)})`;\n    const serialNumber = cert.serialNumber;\n    const algorithm = pki.oids[cert.signatureOid];\n    const thumbprint = getThumbprint(cert);\n\n    return {\n      type: "x509cert",\n      subject,\n      issuer,\n      validFrom,\n      validTo,\n      version,\n      serialNumber,\n      algorithm,\n      thumbprint,\n      pem,\n      publicKey,\n    };\n  } catch (e) {\n    return null;\n  }\n}',
  },
];

let shuffledExamples: { left: string; right: string }[] = [];
let lastExampleLeft: string = "";

export const randomDiffExample = () => {
  // Shuffle the examples if we've seen them all (or on the first run)
  if (shuffledExamples.length === 0) {
    shuffledExamples = [...examples].sort(() => Math.random() - 0.5);

    // Swap first and last example if it's the same as the last one
    if (lastExampleLeft === shuffledExamples[0].left) {
      const tmp = shuffledExamples[0];
      shuffledExamples[0] = shuffledExamples[shuffledExamples.length - 1];
      shuffledExamples[shuffledExamples.length - 1] = tmp;
    }
  }

  const example = shuffledExamples[0];
  lastExampleLeft = example.left;
  shuffledExamples = shuffledExamples.slice(1);

  return example;
};
