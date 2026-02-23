
import {setUser} from "../config.js";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length !== 1){
        throw new Error("The login command expects a single argument, the username")
    }
        
    setUser(args[0]);

    console.log("User switched successfully!");
}
