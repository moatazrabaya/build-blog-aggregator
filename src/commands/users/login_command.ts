
import {setUser} from "../config.js";
import {getUser} from "../lib/db/queries/users.js";
export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length !== 1){
        throw new Error("The login command expects a single argument, the username");
    }
    const username = args[0];
    if(await getUser(username) === undefined){
        throw new Error(`The user ${username} doesn't exist in the database`);
    }
        
    setUser(username);

    console.log("User switched successfully!");
}
