
import {getFeedFollowsForUser} from "../lib/follow.js";
import {User} from "../lib/db/schema.js";

export async function handlerFollowing(cmdName: string, user: User, ...args: string[]): Promise<void>{

    if(args.length !== 0){
        throw new Error("The register command doesn't accept any argument");
    }

    const feeds = await getFeedFollowsForUser(user.name);

    feeds.forEach( (feed) => console.log(feed.feeds.name));

}