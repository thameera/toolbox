const nextJest = require("next/jest");
const { TextEncoder, TextDecoder } = require("util");

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  // The following two globals are required for whatwg-url to work in Jest
  // https://github.com/jsdom/whatwg-url/issues/209
  globals: {
    TextEncoder,
    TextDecoder,
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
