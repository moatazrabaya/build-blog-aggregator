
import {getFeedByUrl} from "../lib/db/queries/feeds.js";
import {insertFeedFollow} from "../lib/db/queries/feed_follows.js";
import {User} from "../lib/db/schema.js";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]): Promise<void>{

    if(args.length !== 1){
        throw new Error("The register command expects a single argument, the feed url");
    }

    const feedUrl = args[0];

    const feed = await getFeedByUrl(feedUrl);

    await insertFeedFollow(user.id, feed.id);

    console.log("Feed-Follow record inserted successfully:");
    console.log(`## User name: ${user.name}`);
    console.log(`## Feed name: ${feed.name}`);

}