"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BlogPost from "@/components/BlogPost";

type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
};

export default function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalView, setIsModalView] = useState(false);

  // Note: we intentionally do not disable body scrolling here because
  // the single-blog view is a full page and should be scrollable.

  const handleBlogClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalView(true);
  };

  const handleCloseModal = () => {
    setIsModalView(false);
    // Small delay before clearing selected blog for smooth transition
    setTimeout(() => setSelectedBlog(null), 300);
  };

  const blogs: Blog[] = [
    {
      id: 1,
      title: "React Hooks: Mastering State Management in Modern Web Apps",
      excerpt: "A deep dive into React Hooks and how they've revolutionized state management in functional components.",
      content: `React Hooks have transformed the way we write React components. Gone are the days when we had to use class components to manage state and side effects. With Hooks, we can now do everything in functional components.

In this blog, I'll explore the most commonly used Hooks like useState, useEffect, useContext, and useReducer. We'll discuss best practices, common pitfalls, and advanced patterns that will help you write cleaner, more maintainable code.

Key topics covered:
- Understanding the useState Hook
- Managing side effects with useEffect
- Custom Hooks for code reusability
- Performance optimization with useCallback and useMemo
- Common mistakes and how to avoid them

By mastering React Hooks, you'll be able to write more efficient and elegant React applications. Whether you're a beginner or an experienced developer, this guide will help you level up your skills.`,
      date: "Nov 2025",
      readTime: "8 min read",
      category: "React",
      author: "Rajesh Thapa",
    },
    {
      id: 2,
      title: "Why TypeScript Over JavaScript: A Comprehensive Guide",
      excerpt: "Discover why TypeScript has become the preferred choice for modern JavaScript development and how it can improve your code quality.",
      content: `JavaScript has been the go-to language for web development for decades, but in recent years, TypeScript has emerged as a game-changer. If you're still debating whether to make the switch, this blog will help you understand why TypeScript might be the right choice for your projects.

In this blog, I'll explore why TypeScript has become the preferred choice for modern JavaScript development and how it can significantly improve your code quality. We'll discuss the key advantages, practical examples, and why many developers and companies have made the switch.

Key advantages of TypeScript:
- Static type checking catches errors before runtime
- Better IDE support and code completion
- Improved code documentation through type annotations
- Easier refactoring with type safety
- Better for large-scale applications and team projects
- Catches potential bugs during development
- Improved code maintainability and readability

By understanding TypeScript's benefits, you'll be able to make an informed decision about whether to adopt it in your projects. Whether you're building a small application or a large enterprise system, TypeScript provides the tools to write more robust and maintainable code.`,
      date: "Oct 2025",
      readTime: "10 min read",
      category: "JavaScript",
      author: "Rajesh Thapa",
    },
    {
      id: 3,
      title: "How AI is Revolutionizing Web Development",
      excerpt: "Explore how artificial intelligence and machine learning are transforming the landscape of web development, from code generation to testing.",
      content: `Artificial Intelligence has become a game-changer in the world of web development. From automating repetitive tasks to generating code, AI is reshaping how we build web applications. In this blog, we'll explore the various ways AI is transforming web development.

In this blog, I'll explore how AI and machine learning are revolutionizing the web development landscape. We'll discuss AI-powered tools, automation capabilities, and practical applications that are changing how developers work today.

Key ways AI is helping Web Developers:
- Code generation and intelligent autocompletion
- Automated testing and bug detection
- Performance optimization and analysis
- Design assistance and UX improvements
- Natural language processing for chatbots
- Enhanced security and threat detection

By understanding how AI is transforming web development, you'll be better equipped to leverage these powerful tools in your own projects. Whether you're looking to improve productivity or enhance your applications, AI offers exciting possibilities for modern developers.`,
      date: "Sep 2025",
      readTime: "12 min read",
      category: "AI/ML",
      author: "Rajesh Thapa",
    },
  ];

  return (
    <>
      {!isModalView ? (
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold mb-12 text-center text-black dark:text-white">
            My Blogs
          </h1>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white dark:bg-gray-800"
                onClick={() => handleBlogClick(blog)}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="secondary">{blog.category}</Badge>
                  </div>

                  <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
                    {blog.title}
                  </h2>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <p>{blog.date}</p>
                      <p>{blog.readTime}</p>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlogClick(blog);
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      Read <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        selectedBlog && (
          <BlogPost blog={selectedBlog} onBack={handleCloseModal} />
        )
      )}
    </>
  );
}