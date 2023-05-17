/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/"],
};
