import { execSync } from "child_process";

const main = () => {
  execSync("nodemon ./scripts/build-cosmos.js");
};
