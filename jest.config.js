/** @type {import('jest').Config} */
export default {
  transform: {
    "\\.js?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(lit|@lit|@lit-labs|@lit-labs/ssr-dom-shim|@open-wc))",
  ],
  verbose: true,
  testEnvironment: "jsdom",
};
