
import {XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string){

    const response = await fetch(feedURL, {
        headers: {
            "User-Agent": "gator",
            accept: "application/rss+xml",
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text(); // XML string
    
    const parser = new XMLParser();

    const result = parser.parse(data);  // rss object

    const channel = result.rss?.channel; // extract the channel property

    if(!channel || !channel.title || !channel.link || !channel.description || !channel.item){
        throw new Error("failed to parse channel");
    }

    let items;

    if(Array.isArray(channel.item))
        items = channel.item;
    else
        items = [channel.item];
    
    let validRssItems = [];

    for(const item of channel.item){
        if(item.description && item.link && item.pubDate && item.title)
            validRssItems.push(item);
    }

    channel.item = validRssItems;

    return {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: channel.item
        }
    };

}
