

import {deleteUsers} from "../../lib/db/queries/users.js";

export async function handlerReset(cmdName: string, ...args: string[]): Promise<void>{

    await deleteUsers();

    console.log("Users records deleted successfully!");
}
