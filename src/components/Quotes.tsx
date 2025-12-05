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
  const [quote, setQuote] = useState<Quote>({ quote: "One shall stand, one shall fall. Life has no Ctrl+Z.", author: "", category: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch("/api/quote");
        const data = await res.json();
        setQuote({
          quote: data.quote || "One shall stand, one shall fall. Life has no Ctrl+Z.",
          author: data.author || "",
          category: data.category || "",
        });
      } 
      catch (err) {
        setQuote({
          quote: "One shall stand, one shall fall. Life has no Ctrl+Z.",
          author: "",
          category: "",
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

          {/* Author (only show if provided) */}
          {quote.author && (
            <CardDescription className="text-sm md:text-base text-gray-500 dark:text-gray-300">
              — {quote.author}
            </CardDescription>
          )}

          {/* Category Badge removed as requested */}
        </CardContent>
      </Card>
    </div>
  );
}