
import {getUsers} from "../../lib/db/queries/users.js";
import {readConfig} from "../../config.js";

export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void>{

    const users = await getUsers();

    const currentUser = readConfig().currentUsername;

    for (const user of users) {
        const userData = `* ${user.name} ${(user.name === currentUser)?`(current)`:``}`;
        console.log(userData);
    }

}

