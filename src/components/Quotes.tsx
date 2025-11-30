"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Quote = {
  quote: string;
  author: string;
  category: string;
};

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<Quote>({ quote: "", author: "", category: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("/api/quote");
        const data = await res.json();
        setQuote({
          quote: data.quote || "Keep pushing forward!",
          author: data.author || "Unknown",
          category: data.category || "Motivational",
        });
      } 
      catch (err) {
        setQuote({
          quote: "Keep pushing forward!",
          author: "Unknown",
          category: "Motivational",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500 dark:text-gray-400 text-base">Loading Random Quote...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">Random Quote</h2>

      <Card className="max-w-3xl mx-auto p-6 shadow-lg hover:shadow-xl transition-shadow bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center text-center gap-3">
          {/* Quote */}
          <CardTitle className="text-lg md:text-xl font-semibold italic text-gray-800 dark:text-white">
            "{quote.quote}"
          </CardTitle>

          {/* Author */}
          <CardDescription className="text-sm md:text-base text-gray-500 dark:text-gray-300">
            — {quote.author}
          </CardDescription>

          {/* Category Badge */}
          <Badge className="mt-2 uppercase tracking-wider">{quote.category}</Badge>
        </CardContent>
      </Card>
    </div>
  );
}