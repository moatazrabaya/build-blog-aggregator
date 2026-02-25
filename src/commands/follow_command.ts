
import {getFeedByUrl} from "../lib/db/queries/feeds.js";
import {readConfig} from "../config.js";
import {getUser} from "../lib/db/queries/users.js";
import {insertFeedFollow} from "../lib/db/queries/feed_follows.js"

export async function handlerFollow(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length !== 1){
        throw new Error("The register command expects a single argument, the feed url");
    }

    const feedUrl = args[0];

    const feed = await getFeedByUrl(feedUrl);

    const currentUserName = readConfig().currentUsername;

    const user = await getUser(currentUserName);

    const record = await insertFeedFollow(user.id, feed.id);

    console.log("Feed-Follow record inserted successfully:");
    console.log(`## User name: ${user.name}`);
    console.log(`## Feed name: ${feed.name}`);

}