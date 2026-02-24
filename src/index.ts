
import type {CommandsRegistry} from "./commands/commands.js";
import {registerCommand, runCommand} from "./commands/commands.js";
import {handlerLogin} from "./commands/users/login_command.js";
import {handlerRegister} from "./commands/users/register_command.js";
import {handlerReset} from "./commands/users/reset_command.js";
import {handlerUsers} from "./commands/users/users_command.js";

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

  registerCommand(registry, "register", handlerRegister);

  registerCommand(registry, "reset", handlerReset);

  registerCommand(registry, "users", handlerUsers);
  
  try{
    await runCommand(registry, commandName, ...commandArgs);
  } catch (err){
    if(err instanceof Error)
      console.error(`Error running command ${commandName}: ${err.message}`);
    else
      console.error(`Error running command ${commandName}: ${err}`);
    process.exit(1);
  }
  process.exit(0);
}

main();