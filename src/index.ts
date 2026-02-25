
import type {CommandsRegistry} from "./commands/commands.js";
import {registerCommand, runCommand} from "./commands/commands.js";
import {handlerLogin} from "./commands/users/login_command.js";
import {handlerRegister} from "./commands/users/register_command.js";
import {handlerReset} from "./commands/users/reset_command.js";
import {handlerUsers} from "./commands/users/users_command.js";
import {handlerAgg} from "./commands/agg_command.js";
import {handlerAddFeed} from "./commands/feeds/addfeed_command.js";
import {handlerFeeds} from "./commands/feeds/feeds_command.js";
import {handlerFollow} from "./commands/follow_command.js";
import {handlerFollowing} from "./commands/following_command.js";
import {middlewareLoggedIn} from "./middlewares/loggedIn_middleware.js";
import {handlerUnfollow} from "./commands/unfollow_command.js";
import {handlerBrowse} from "./commands/browse_command.js";

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

  registerCommand(registry, "agg", handlerAgg);

  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));

  registerCommand(registry, "feeds", handlerFeeds);

  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));

  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));

  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));

  registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));
  
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