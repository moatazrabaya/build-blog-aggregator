
import { setUser } from "./config.js";
import { readConfig } from "./config.js";

function main() {
  setUser("moataz");

  const config = readConfig();

  console.log(`dbUrl: ${config.dbUrl}`);
  console.log(`currentUserName: ${config.currentUsername}`);
}

main();