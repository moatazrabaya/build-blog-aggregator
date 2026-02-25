
import {insertFeedFollow, getFeedFollowDetails, getFeedFollowsByUser} from "../lib/db/queries/feed_follows.js";
import {getUser} from "../lib/db/queries/users.js";

export async function createFeedFollow (user_id: string, feed_id: string) {

    const record = await insertFeedFollow(user_id, feed_id);

    const details = await getFeedFollowDetails(record.user_id, record.feed_id);

    return {
        id: details.feed_follows.id,
        createdAt: details.feed_follows.createdAt,
        updatedAt: details.feed_follows.updatedAt,
        user_id: details.feed_follows.user_id,
        user_name: details.users.name,
        feed_id: details.feed_follows.feed_id, 
        feed_name: details.feeds.name
    };
}

export async function getFeedFollowsForUser(name: string) {
    const user = await getUser(name);

    const userId = user.id;

    const records = await getFeedFollowsByUser(userId);

    const result = [];
    
    for(const record of records){
        result.push(await getFeedFollowDetails(record.user_id, record.feed_id));
    }

    return result;
}