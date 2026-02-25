import {posts, feeds, type Post, feed_follows} from "../schema";
import { db } from "..";
import { eq, desc} from 'drizzle-orm';

export async function createPost (post: Post) {
  const [result] = await db.insert(posts).values(post).returning();
  return result;
}

export async function getPostsForUser (user_id: string, limit: number = 2) {

    const result = await db
    .select({
      id: posts.id,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      title: posts.title,
      url: posts.url,
      description: posts.description,
      published_at: posts.published_at,
      feed_id: posts.feed_id,
      feedName: feeds.name,
    })
    .from(posts)
    .innerJoin(feed_follows, eq(posts.feed_id, feed_follows.feed_id))
    .innerJoin(feeds, eq(posts.feed_id, feeds.id))
    .where(eq(feed_follows.user_id, user_id))
    .orderBy(desc(posts.published_at))
    .limit(limit);

  return result;
}
