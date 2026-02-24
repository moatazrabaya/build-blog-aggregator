
import {fetchFeed} from "../lib/rss.js";
export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void>{

    const url = `https://www.wagslane.dev/index.xml`;

    const result = await fetchFeed(url);

    console.log(result?.channel);
}
