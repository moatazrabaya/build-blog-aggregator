
import {createFeed} from "../lib/db/queries/feeds.js";
import {readConfig} from "../config.js";
import {getUser} from "../lib/db/queries/users.js";
import type { Feed, User } from "../lib/db/schema.js";

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length !== 2){
        throw new Error("The register command expects two arguments, the feed name and the url of the feed");
    }

    const feedName = args[0];
    const feedUrl = args[1];

    const currentUserName = readConfig().currentUsername;

    const currentUser = await getUser(currentUserName);

    if(!currentUser){
        throw new Error(`User ${currentUserName} not found`);
    }

    const feed = await createFeed(feedName, feedUrl, currentUser.id);

    console.log("Feed created successfully:");
    printFeed(feed, currentUser);
}

export function printFeed(feed: Feed, user: User){
    console.log(`## Feed ID:       ${feed.id}`);
    console.log(`## Creation Time: ${feed.createdAt}`);
    console.log(`## Update Time:   ${feed.updatedAt}`);
    console.log(`## Feed Name:     ${feed.name}`);
    console.log(`## Feed URL:      ${feed.url}`);
    console.log(`## User Name:     ${user.name}`);
}