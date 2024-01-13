module.exports = {
  testEnvironment: "node", // Use 'node' for testing in a Node.js environment

  // Optional: Specify the test regex pattern to match test files
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",

  // Optional: Specify the file extensions that Jest should look for
  moduleFileExtensions: ["js", "json", "jsx", "node"],

  // Optional: Configure Jest to use Babel for transpiling JavaScript files
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
