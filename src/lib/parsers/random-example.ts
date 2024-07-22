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
];

let lastIndex = -1;

export const randomExample = () => {
  let index = lastIndex;
  while (index === lastIndex) {
    index = Math.floor(Math.random() * examples.length);
  }
  lastIndex = index;
  return examples[index];
};
