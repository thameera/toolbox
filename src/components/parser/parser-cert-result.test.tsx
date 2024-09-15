import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IParsedX509Cert } from "@/lib/parsers/types";
import { ParserCertResult } from "./parser-cert-result";

const mockCert: IParsedX509Cert = {
  type: "x509cert",
  subject: "CN=thameera.com",
  issuer: "C=US, O=Let's Encrypt, CN=R10",
  validFrom: "2024-07-02T09:02:31.000Z",
  validTo: "2024-09-30T09:02:30.000Z",
  version: "3 (0x2)",
  serialNumber: "0318334e865e1cc4b9cffb3f1670c980a3ed",
  algorithm: "sha256WithRSAEncryption",
  thumbprint: "E7B02944C729CBBDF75BD153125FC6E1B53893BA",
  pem: "-----BEGIN CERTIFICATE-----\r\nMIIFQDCCBCigAwIBAgISAxgzToZeHMS5z/s/FnDJgKPtMA0GCSqGSIb3DQEBCwUA\r\nMDMxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQwwCgYDVQQD\r\nEwNSMTAwHhcNMjQwNzAyMDkwMjMxWhcNMjQwOTMwMDkwMjMwWjAXMRUwEwYDVQQD\r\nEwx0aGFtZWVyYS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN\r\n7KDh214q8yrtATY4iNL8BWsfovaKqtEZOfqivmjLMwmkVgnl4BN6ljE52AZt3dcz\r\nL1QNPN6az0NctQTKApOkI+Nyu2UySkvN18F/MwQ4hswxPUIegI+I5MRgMDMonLEJ\r\nMTVptBQgZvXEVnBlcvQNrdPPC8/CnhxQ7axrF1WSm3YaVjyj/rEpjQPsoX9oF8wa\r\nWx6XmJxbV73DMt+kOrqnYV90vu5E78XrFIgRCP3ApDOhp5ynlBOyYyx7E4vrz5pd\r\nQcP2mnFsEg8SVLIXXdh7VoJ/4gJGFR6KLV3mF/Fl+rugc2gYwLBYQigjbn9IUdRZ\r\nNMk8IsFFtkKYtQcwMDclAgMBAAGjggJoMIICZDAOBgNVHQ8BAf8EBAMCBaAwHQYD\r\nVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwHQYDVR0O\r\nBBYEFNJLABSvYec4/TmlQ7ynQiogi7fAMB8GA1UdIwQYMBaAFLu8w0el5LypxsOk\r\ncgwQjaI14cjoMFcGCCsGAQUFBwEBBEswSTAiBggrBgEFBQcwAYYWaHR0cDovL3Ix\r\nMC5vLmxlbmNyLm9yZzAjBggrBgEFBQcwAoYXaHR0cDovL3IxMC5pLmxlbmNyLm9y\r\nZy8wbwYDVR0RBGgwZoIPYWgudGhhbWVlcmEuY29tghFibG9nLnRoYW1lZXJhLmNv\r\nbYIMdGhhbWVlcmEuY29tgiB0bXAtd3AtYXV0aDAtMjAyMjA1LnRoYW1lZXJhLmNv\r\nbYIQd3d3LnRoYW1lZXJhLmNvbTATBgNVHSAEDDAKMAgGBmeBDAECATCCAQQGCisG\r\nAQQB1nkCBAIEgfUEgfIA8AB3AD8XS0/XIkdYlB1lHIS+DRLtkDd/H4Vq68G/KIXs\r\n+GRuAAABkHLlWeMAAAQDAEgwRgIhANHrrmK7tqLodkHMs/u41XS93KdpZjtb4xyb\r\nqVzCAMNxAiEA8f8Y7AloKkss+z4l4wZf1cLs63WLTLUsoiIM3uZ7YHsAdQDf4Vbr\r\nqgWvtZwPhnGNqMAyTq5W2W6n9aVqAdHBO75SXAAAAZBy5VroAAAEAwBGMEQCIDic\r\nzFf8ZHxjKiFNVrNXmR/Eq5UQvOWk81TJ65s6EBjQAiAoizn0wtY8kZR3v1R01tDK\r\nFEDyCSGC6JKwoZlE77xvRjANBgkqhkiG9w0BAQsFAAOCAQEAO7kUmfJDHGSEW3cn\r\nuVoHYI0gHQg5Dl4ND9+wXD8P8ijJo7XYffw+I48dGpJcOfQtBlhszi+PEfZjsYh4\r\nEJlBLA1nkNwqjgE6mvls1hXtwtBuMN6Adg4emLv/MNeAakx8MWDF1eagGWjzVhvk\r\nGzgLHNZbO2+Kmd5eHcyvsVM8Pm7nDMn6H6KGBUXVZzj0r052QRth28g6AZdka9Xn\r\n9UyIuRvSFbnmx2bG7r+s8/f5A7jiJyOgu05ZDQX4lXZyhVPcZATW5jH7Bh8K4/+v\r\n9sxRzEIwhY/Ch6+SnREhvN48uUBo1ZXr2YJsfhdIbAKVSSMqGi0Hf19D7peE1irN\r\nHe8smg==\r\n-----END CERTIFICATE-----\r\n",
  publicKey:
    "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzeyg4dteKvMq7QE2OIjS\r\n/AVrH6L2iqrRGTn6or5oyzMJpFYJ5eATepYxOdgGbd3XMy9UDTzems9DXLUEygKT\r\npCPjcrtlMkpLzdfBfzMEOIbMMT1CHoCPiOTEYDAzKJyxCTE1abQUIGb1xFZwZXL0\r\nDa3TzwvPwp4cUO2saxdVkpt2GlY8o/6xKY0D7KF/aBfMGlsel5icW1e9wzLfpDq6\r\np2FfdL7uRO/F6xSIEQj9wKQzoaecp5QTsmMsexOL68+aXUHD9ppxbBIPElSyF13Y\r\ne1aCf+ICRhUeii1d5hfxZfq7oHNoGMCwWEIoI25/SFHUWTTJPCLBRbZCmLUHMDA3\r\nJQIDAQAB\r\n-----END PUBLIC KEY-----\r\n",
};

describe("ParserCertResult", () => {
  it("renders the certificate details correctly", () => {
    render(<ParserCertResult cert={mockCert} />);

    expect(screen.getByText("X.509 Certificate")).toBeInTheDocument();

    const tableRows = screen.getByRole("table").querySelectorAll("tr");
    expect(tableRows).toHaveLength(8);

    const labels = [
      "Version",
      "Subject",
      "Issuer",
      "Valid From",
      "Valid To",
      "Serial Number",
      "Algorithm",
      "Thumbprint",
    ];
    labels.forEach((label, index) => {
      expect(tableRows[index].textContent).toContain(label);
    });

    expect(screen.getByText("PEM-formatted certificate")).toBeInTheDocument();
    expect(screen.getByText("Public Key")).toBeInTheDocument();

    const textareas = screen.getAllByRole("textbox");
    expect(textareas).toHaveLength(2);
    expect(textareas[0]).toHaveTextContent("-----BEGIN CERTIFICATE-----");
    expect(textareas[1]).toHaveTextContent("-----BEGIN PUBLIC KEY-----");
  });
});
