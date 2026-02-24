
import {getFeeds} from "../../lib/db/queries/feeds.js";
import {getUserById} from "../../lib/db/queries/users.js";

export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void>{

    const feeds = await getFeeds();
    let user;
    let feds = [];
    for (const feed of feeds) {
        user = await getUserById(feed.user_id);
        feds.push({
            feedName: feed.name,
            url: feed.url,
            userName: user.name
        });
    }
    console.log(feds);
}