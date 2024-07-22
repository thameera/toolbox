const examples = [
  "https://example.com",
  "https://example.com/path?query=param",
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
