import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { handleError } from "@/utils/errorHandler";

type Blog = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
};

export async function GET() {
  try {
    const rssUrl = "https://medium.com/feed/@pratyoos";
    const res = await fetch(rssUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch RSS: ${res.status}`);
    }

    const xmlData = await res.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });

    const jsonObj = parser.parse(xmlData);
    const items = jsonObj.rss.channel.item;

    const blogs: Blog[] = items.map((item: any, index: number) => {
      const contentHtml = item["content:encoded"] || "";

      const paragraphMatches = [...contentHtml.matchAll(/<p>(.*?)<\/p>/g)];
      const description = paragraphMatches
        .slice(0, 3)
        .map((p) => p[1])
        .join(" ");

      const imageMatch = contentHtml.match(/<img.*?src="(.*?)"/);
      const image = imageMatch ? imageMatch[1] : "/placeholder.png";

      const date = new Date(item.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        id: index + 1,
        title: item.title,
        description,
        image,
        link: item.link,
        date,
      };
    });

    return NextResponse.json(blogs);
  } 
  catch (error) {
    return handleError(error);
  }
}