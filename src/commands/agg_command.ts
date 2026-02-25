
import {fetchFeed} from "../lib/rss.js";
import {updateFeedTime, getFeedById} from "../lib/db/queries/feeds";
import { feeds } from "../lib/db/schema";
import {db} from "../lib/db/index.js";
import { sql} from 'drizzle-orm';

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void>{

    if(args.length !== 1)
        throw new Error("The register command expects a single argument, the time between requests");

    const timeBetweenReqs = args[0];

    console.log(`Collecting feeds every ${timeBetweenReqs}...\n`);

    const timeInMs = parseDuration(timeBetweenReqs);

    const handleError = (err: unknown) => {
        console.error("Error scraping feeds:", err);
    };

    scrapeFeeds().catch(handleError);

    const interval = setInterval(() => {
        scrapeFeeds().catch(handleError);
    }, timeInMs);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("\nShutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });

}

export async function scrapeFeeds() {
    const nextFeedId = await getNextFeedToFetch();

    await markFeedFetched(nextFeedId);

    const feed = await getFeedById(nextFeedId);

    const fetchedFeed = await fetchFeed(feed.url);

     console.log(
    `-> Feed ${feed.name} collected, ${fetchedFeed.channel.item.length} posts found:`,
  );

    for(const item of fetchedFeed?.channel.item)
        console.log(`   ** ${item?.title}`);
    console.log("----------------------------------------------------------------------------");
}

export async function markFeedFetched(id: string) {
    await updateFeedTime(id);
}

export async function getNextFeedToFetch() {
    const result = await db.select({ id: feeds.id })
    .from(feeds)
    .orderBy(sql`${feeds.last_fetched_at} ASC NULLS FIRST`)
    .limit(1);

    return result[0].id;
}

export function parseDuration(durationStr: string): number{
    
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    
    if (!match) 
        throw new Error(`Invalid duration format: ${durationStr}. Expected format like "100ms", "30s", "5m", or "2h"`);
    
    const value = parseInt(match[1], 10);
    const unit = match[2];
    
    switch (unit) {
        case 'ms':
            return value;
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        default:
            throw new Error(`Unknown time unit: ${unit}`);
    }
}
