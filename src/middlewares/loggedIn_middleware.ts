
import {readConfig} from "../config.js";
import {getUser} from "../lib/db/queries/users.js";
import {UserCommandHandler, CommandHandler} from "../commands/commands.js";

export function middlewareLoggedIn( handler: UserCommandHandler): CommandHandler {

    return async function (cmdName: string, ...args: string[]){
        
        const userName = readConfig().currentUsername;

        if (!userName) 
            throw new Error("User not logged in");

        const currentUser = await getUser(userName);

        if (!currentUser) 
            throw new Error(`User ${userName} not found`);
    
        return handler(cmdName, currentUser, ...args);
    };

}