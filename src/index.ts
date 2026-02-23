
import type {CommandsRegistry} from "./commands/commands.js";
import {registerCommand, runCommand} from "./commands/commands.js";
import {handlerLogin} from "./commands/login_command.js";

async function main() {
  
  const args = process.argv.slice(2);

  if(args.length === 0){
    console.log("There is no arguments");
    process.exit(1);
  }

  let registry: CommandsRegistry = {};
  const commandName = args[0];
  const commandArgs = args.slice(1);
  
  registerCommand(registry, "login", handlerLogin);
  
  await runCommand(registry, commandName, ...commandArgs);
  
  process.exit(0);
}

main();