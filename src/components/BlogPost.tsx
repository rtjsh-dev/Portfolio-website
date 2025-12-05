"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Blog = {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
};

export default function BlogPost({
  blog,
  onBack,
}: {
  blog: Blog;
  onBack?: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button onClick={onBack} variant="outline" className="mb-6">
        ← Back to Blogs
      </Button>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary">{blog.category}</Badge>
            <p className="text-sm text-gray-500 dark:text-gray-400">{blog.date} • {blog.readTime}</p>
          </div>

          <h1 className="text-4xl font-bold text-black dark:text-white">{blog.title}</h1>
        </header>

        <section className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </section>

        {/* author removed per request */}
      </article>
    </div>
  );
}
