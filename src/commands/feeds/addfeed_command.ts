
import {createFeed} from "../../lib/db/queries/feeds.js";
import type { Feed, User } from "../../lib/db/schema.js";
import {insertFeedFollow} from "../../lib/db/queries/feed_follows.js";

export async function handlerAddFeed (cmdName: string, user: User, ...args: string[]) {

    if(args.length !== 2){
        throw new Error("The register command expects two arguments, the feed name and the url of the feed");
    }

    const feedName = args[0];
    const feedUrl = args[1];

    const feed = await createFeed(feedName, feedUrl, user.id);

    console.log("Feed created successfully:");

    await insertFeedFollow(user.id, feed.id);

    printFeed(feed, user);
}

function printFeed(feed: Feed, user: User){
    console.log(`## Feed ID:       ${feed.id}`);
    console.log(`## Creation Time: ${feed.createdAt}`);
    console.log(`## Update Time:   ${feed.updatedAt}`);
    console.log(`## Feed Name:     ${feed.name}`);
    console.log(`## Feed URL:      ${feed.url}`);
    console.log(`## User Name:     ${user.name}`);
}