import { TextEncoder, TextDecoder } from "util";

// The following two globals are required for whatwg-url to work in Jest
// https://github.com/jsdom/whatwg-url/issues/209
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

Range.prototype.getBoundingClientRect = () => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 100,
  x: 0,
  y: 0,
  toJSON: jest.fn(),
});
Range.prototype.getClientRects = () => ({
  item: () => null,
  length: 0,
  [Symbol.iterator]: jest.fn(),
});
