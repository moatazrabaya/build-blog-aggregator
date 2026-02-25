import {getFeedFollowsForUser} from "../lib/follow.js";
import {readConfig} from "../config.js";
import {getUser} from "../lib/db/queries/users.js";

export async function handlerFollowing(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length !== 0){
        throw new Error("The register command doesn't accept any argument");
    }

    const userName = readConfig().currentUsername;

    const currentUser = await getUser(userName);
    
    if(!currentUser){
        throw new Error(`User ${userName} not found`);
    } 

    const feeds = await getFeedFollowsForUser(userName);

    feeds.forEach( (feed) => console.log(feed.feeds.name));

}