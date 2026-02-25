
import {getFeedByUrl} from "../lib/db/queries/feeds.js";
import {deleteFeedFollow} from "../lib/db/queries/feed_follows.js";
import {User} from "../lib/db/schema.js";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void>{

    if(args.length !== 1){
        throw new Error("The register command expects a single argument, the feed url");
    }

    const feedUrl = args[0];

    const feed = await getFeedByUrl(feedUrl);

    await deleteFeedFollow(user.id, feed.id);

    console.log(`${user.name} unfollowed ${feed.name} feed!`);

}