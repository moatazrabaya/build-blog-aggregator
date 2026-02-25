
import { users, feeds, feed_follows } from "../schema";
import { db } from "..";
import { eq, and} from 'drizzle-orm';

export async function insertFeedFollow(user_id: string, feed_id: string) {
  const [result] = await db.insert(feed_follows).values({ user_id: user_id, feed_id: feed_id }).returning();
  return result;
}

export async function getFeedFollowDetails(user_id: string, feed_id: string) {
    const [result] = await db.select()
                            .from(feed_follows)
                            .innerJoin(users, eq(feed_follows.user_id, users.id))
                            .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
                            .where(
                                and(
                                eq(feed_follows.user_id, user_id),
                                eq(feed_follows.feed_id, feed_id)
                                )
                            ); 
    return result;
}

export async function getFeedFollowsByUser (user_id: string) {
    const result = await db.select().from(feed_follows).where(eq(feed_follows.user_id, user_id));
    return result;
}