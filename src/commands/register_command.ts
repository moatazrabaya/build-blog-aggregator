
import {createUser, getUser} from "../lib/db/queries/users.js";
import {setUser} from "../config.js";

export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length !== 1){
        throw new Error("The register command expects a single argument, the username")
    }
        
    if(await getUser(args[0]) !== undefined){
        throw new Error(`The user ${args[0]} already exist`);
    }

    const user = await createUser(args[0]);

    setUser(args[0]);

    console.log("The user was created successfully!");
    console.log(user);
}

