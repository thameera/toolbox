const examples = [
  /* URLs */
  "https://example.com/authorize?response_type=code&client_id=12345&redirect_uri=https%3A%2F%2Fclient.example.com%2Fcallback&scope=openid%20profile&state=xyz",
  "https://example.com/callback?#access_token=pqrstuvwxyz&state=abcdefg",
  "mongodb://admin:pa$$w0rd@host1.example.com:27017/?authMechanism=DEFAULT",
  "/authorize?response_type=token id_token&client_id=12345&redirect_uri=https%3A%2F%2Fclient.example.com%2Fcallback&scope=openid%20profile%20email&state=xyz&nonce=123",
  /* JWTs */
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Buci5wYXduZWUuaW4uZ292LyIsInN1YiI6InJvbl9zd2Fuc29uIiwiZGVwdCI6IlBhcmtzICYgUmVjIiwicm9sZXMiOlsiZGlyZWN0b3IiXSwiaGF0ZXNHb3Z0Ijp0cnVlLCJpYXQiOjE3MjE2NTUzNjksImV4cCI6MTcyMTY3NTM2OSwiYXpwIjoicGFya3MtY2xpZW50Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSJ9.Jz7Xm0SWdmbRyTUwxa9Aa41azGRkSReb4MkfBtjeYp8",
  /* JSON */
  '{"id":1,"name":"Leslie Knope","dept":"Parks & Rec","city":"Pawnee","state":"IN","lovesWaffles":true}',
  '[{"id":1,"name":"Ann Perkins","department":"Health","city":"Pawnee","state":"IN","isNurse":true,"bestFriend":"Leslie Knope"},{"id":2,"name":"Andy Dwyer","department":"Shoe Shine","city":"Pawnee","state":"IN","alterEgo":"Burt Macklin","marriedTo":"April Ludgate","bands":[{"name":"Mouse Rat","role":"Lead Singer"},{"name":"Scarecrow Boat","role":"Guitarist"}]},{"id":3,"name":"April Ludgate","department":"Parks and Recreation","city":"Pawnee","state":"IN","isSarcastic":true,"marriedTo":"Andy Dwyer"}]',
  /* XML */
  '<?xml version="1.0" encoding="UTF-8"?><constructionTeam><teamMember id="1"><name>Michael Brown</name><role>Architect</role><experience>15 years</experience><contact><email>michael.brown@example.com</email><phone>123-456-7890</phone></contact></teamMember><teamMember id="2"><name>Linda Martinez</name><role>Site Supervisor</role><experience>12 years</experience><contact><email>linda.martinez@example.com</email><phone>444-444-4444</phone></contact></teamMember><teamMember id="3"><name>Robert Taylor</name><role>Electrician</role><experience>7 years</experience><contact><email>robert.taylor@example.com</email><phone>333-333-3333</phone></contact></teamMember></constructionTeam>',
  /* user-agent */
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  /* Base64 json */
  "eyJyZXR1cm5UbyI6ICJodHRwOi8vbG9jYWxob3N0OjMwMDAifQ==",
  /* X509 certs */
  "-----BEGIN CERTIFICATE-----\nMIIFQDCCBCigAwIBAgISAxgzToZeHMS5z/s/FnDJgKPtMA0GCSqGSIb3DQEBCwUA\nMDMxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQwwCgYDVQQD\nEwNSMTAwHhcNMjQwNzAyMDkwMjMxWhcNMjQwOTMwMDkwMjMwWjAXMRUwEwYDVQQD\nEwx0aGFtZWVyYS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDN\n7KDh214q8yrtATY4iNL8BWsfovaKqtEZOfqivmjLMwmkVgnl4BN6ljE52AZt3dcz\nL1QNPN6az0NctQTKApOkI+Nyu2UySkvN18F/MwQ4hswxPUIegI+I5MRgMDMonLEJ\nMTVptBQgZvXEVnBlcvQNrdPPC8/CnhxQ7axrF1WSm3YaVjyj/rEpjQPsoX9oF8wa\nWx6XmJxbV73DMt+kOrqnYV90vu5E78XrFIgRCP3ApDOhp5ynlBOyYyx7E4vrz5pd\nQcP2mnFsEg8SVLIXXdh7VoJ/4gJGFR6KLV3mF/Fl+rugc2gYwLBYQigjbn9IUdRZ\nNMk8IsFFtkKYtQcwMDclAgMBAAGjggJoMIICZDAOBgNVHQ8BAf8EBAMCBaAwHQYD\nVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB/wQCMAAwHQYDVR0O\nBBYEFNJLABSvYec4/TmlQ7ynQiogi7fAMB8GA1UdIwQYMBaAFLu8w0el5LypxsOk\ncgwQjaI14cjoMFcGCCsGAQUFBwEBBEswSTAiBggrBgEFBQcwAYYWaHR0cDovL3Ix\nMC5vLmxlbmNyLm9yZzAjBggrBgEFBQcwAoYXaHR0cDovL3IxMC5pLmxlbmNyLm9y\nZy8wbwYDVR0RBGgwZoIPYWgudGhhbWVlcmEuY29tghFibG9nLnRoYW1lZXJhLmNv\nbYIMdGhhbWVlcmEuY29tgiB0bXAtd3AtYXV0aDAtMjAyMjA1LnRoYW1lZXJhLmNv\nbYIQd3d3LnRoYW1lZXJhLmNvbTATBgNVHSAEDDAKMAgGBmeBDAECATCCAQQGCisG\nAQQB1nkCBAIEgfUEgfIA8AB3AD8XS0/XIkdYlB1lHIS+DRLtkDd/H4Vq68G/KIXs\n+GRuAAABkHLlWeMAAAQDAEgwRgIhANHrrmK7tqLodkHMs/u41XS93KdpZjtb4xyb\nqVzCAMNxAiEA8f8Y7AloKkss+z4l4wZf1cLs63WLTLUsoiIM3uZ7YHsAdQDf4Vbr\nqgWvtZwPhnGNqMAyTq5W2W6n9aVqAdHBO75SXAAAAZBy5VroAAAEAwBGMEQCIDic\nzFf8ZHxjKiFNVrNXmR/Eq5UQvOWk81TJ65s6EBjQAiAoizn0wtY8kZR3v1R01tDK\nFEDyCSGC6JKwoZlE77xvRjANBgkqhkiG9w0BAQsFAAOCAQEAO7kUmfJDHGSEW3cn\nuVoHYI0gHQg5Dl4ND9+wXD8P8ijJo7XYffw+I48dGpJcOfQtBlhszi+PEfZjsYh4\nEJlBLA1nkNwqjgE6mvls1hXtwtBuMN6Adg4emLv/MNeAakx8MWDF1eagGWjzVhvk\nGzgLHNZbO2+Kmd5eHcyvsVM8Pm7nDMn6H6KGBUXVZzj0r052QRth28g6AZdka9Xn\n9UyIuRvSFbnmx2bG7r+s8/f5A7jiJyOgu05ZDQX4lXZyhVPcZATW5jH7Bh8K4/+v\n9sxRzEIwhY/Ch6+SnREhvN48uUBo1ZXr2YJsfhdIbAKVSSMqGi0Hf19D7peE1irN\nHe8smg==\n-----END CERTIFICATE-----",
  "MIIC5DCCAcygAwIBAgIJGFvVaEzVIPcQMA0GCSqGSIb3DQEBBQUAMBkxFzAVBgNVBAMTDnRoYW0uYXV0aDAuY29tMB4XDTE2MDQyMTA2NTY0MFoXDTI5MTIyOTA2NTY0MFowGTEXMBUGA1UEAxMOdGhhbS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDIa7050W/GB1HBDMb+O+Mivgh01GA2SN2yqmhozQC9ih7mCnEzEaRNolP2vmi4AAG4o2Vf1JK2kzyRPiDgC+dWT/RmLg0e0WHxQkHWlVyFDU73s//VIjhTxjZ1RpyKAlv2hVDN+tYimn81jlVNAsZI97zgUTna9I38vMQ+oatJWF48LlyYittQGXOK91K50YLXj5XW5K2N/Rke5GBXowlmJsSplbjyIrNN2AFWnNjGVyE/a6bf5eLiMeeGgOcr8f/oNH5xZs1K7Cqp2WeIv3uCLMKUo/DedD6SIq9SIrqT4Ls1Ijieacq8eD3kNAt7+k+6gNagezT5d0nYSKKn3jEZAgMBAAGjLzAtMAwGA1UdEwQFMAMBAf8wHQYDVR0OBBYEFGbP8T3m3/Ox79wZgGg8h8lNJcE1MA0GCSqGSIb3DQEBBQUAA4IBAQAs0sVgota1I8yacZ9epWS4os+DEPIvja1poewaxD7sWHntRcbYh75zliQAfoPTxRWdUP746NLoBAiqWr93ccHt5zBrgxH1nRsr2nHxK1yyzKlgsMSzrcjS6+RNYcLYrGdO16NEftQUeJOOVE82/udxNYNhoxc5RpyzDrSc6FL5zhdgyhvIbO/Kk6I0ogTJVemLzdGw+PhBSwgKjHfHEKBWeOpi33HOrgcd5+jMmouK7gSPeg2TuzYE77tKO18pA9yUF0wxN926VKPrMWJU7G6UnQ7GG6P46jjfLU5x9DHzdKHV06e1HhncEEjDTllj8/qeZrbgCKN4R540lxJW9fcJ",
  /* Math expression */
  "42*84+2",
  "2*pi*5^2",
];

let lastIndex = -1;

export const randomParserExample = () => {
  let index = lastIndex;
  while (index === lastIndex) {
    index = Math.floor(Math.random() * examples.length);
  }
  lastIndex = index;
  return examples[index];
};
