import path from "path";
import { Config } from "jest";

console.log("Root Directory:", __dirname);
console.log("fileIndex.tsx:", path.resolve(__dirname, "src/index.tsx"));

const config: Config = {
  testPathIgnorePatterns: [
    path.resolve(__dirname, "src/index.tsx"),
    path.resolve(__dirname, "src/reportWebVitals.ts"),
  ],
  coveragePathIgnorePatterns: [
    path.resolve(__dirname, "src/index.tsx"),
    path.resolve(__dirname, "src/reportWebVitals.ts"),
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default config;
