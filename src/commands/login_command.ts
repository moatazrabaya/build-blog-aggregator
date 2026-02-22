
import {setUser} from "../config.js";

export function handlerLogin(cmdName: string, ...args: string[]): void{

    if(args.length !== 1){
        throw new Error("The login command expects a single argument, the username")
    }
        
    setUser(args[0]);

    console.log("User switched successfully!");
}
