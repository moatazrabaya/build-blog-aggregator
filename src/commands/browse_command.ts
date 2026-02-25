
import {User} from "../lib/db/schema.js";
import {getPostsForUser} from "../lib/db/queries/posts.js";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]): Promise<void>{

    let limit = 2; // default value

    const specifiedLimit = parseInt(args[0]);

    if (args.length === 1 && specifiedLimit)
        limit = specifiedLimit;

    const posts = await getPostsForUser(user.id, limit);

    console.log(`Found ${posts.length} posts for user ${user.name}`);
    
    for (const post of posts) {
        console.log(`${post.published_at} from ${post.feedName}`);
        console.log(`--- ${post.title} ---`);
        console.log(`    ${post.description}`);
        console.log(`Link: ${post.url}`);
        console.log(`=====================================`);
    }

}