import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.API_NINJAS_KEY;

    // Local fallback list of quotes
    const fallbackQuotes = [
      { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Motivational" },
      { quote: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.", author: "Winston Churchill", category: "Motivational" },
      { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", category: "Life" },
      { quote: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi", category: "Inspirational" },
      { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Productivity" },
    ];

    if (!API_KEY) {
      // Return a random fallback immediately when there's no API key
      const pick = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      return NextResponse.json(pick);
    }

    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (!res.ok) {
      // external API failed — fallback to local random quote
      const pick = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      return NextResponse.json(pick);
    }

    const data = await res.json();
    return NextResponse.json(data[0]);
  }
  catch (error) {
    return handleError(error);
  }
}