/** @type {import('jest').Config} */
export default {
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.css$": "some-css-transformer",
  },
};
