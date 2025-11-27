"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

TypeScript adds static typing to JavaScript, which brings numerous benefits to your development workflow. Let's explore the key advantages:

Key advantages of TypeScript:
- Static type checking catches errors before runtime
- Better IDE support and code completion
- Improved code documentation through type annotations
- Easier refactoring with type safety
- Better for large-scale applications and team projects
- Catches potential bugs during development
- Improved code maintainability and readability

TypeScript compiles to plain JavaScript, so you can gradually adopt it in your existing projects. Whether you're building a small application or a large enterprise system, TypeScript provides the tools to write more robust and maintainable code.

In this guide, we'll explore practical examples of how TypeScript prevents common bugs, improves developer experience, and scales better for complex applications. By the end, you'll understand why many companies and developers have made the switch to TypeScript.`,
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

Key ways AI is helping Web Developers:

1. Code Generation and Autocompletion:
AI-powered tools like GitHub Copilot, ChatGPT, and Tabnine are revolutionizing how we write code. These tools can suggest code snippets, complete functions, and even help with complex logic, significantly speeding up development time.

2. Automated Testing:
AI can generate test cases automatically, analyze code for potential bugs, and help identify edge cases that human testers might miss. This leads to more robust applications with fewer bugs.

3. Performance Optimization:
Machine learning algorithms can analyze application performance, identify bottlenecks, and suggest optimizations. AI can help optimize images, minify code, and improve overall application performance.

4. Design and UX:
AI tools can help generate design suggestions, analyze user behavior, and provide recommendations for improving user experience. Tools like Figma with AI plugins are making design more intelligent.

5. Natural Language Processing:
AI-powered chatbots and virtual assistants are becoming increasingly common in web applications, providing better customer support and user engagement.

6. Security:
AI can help identify security vulnerabilities, detect suspicious patterns, and protect applications from cyber threats in real-time.

The Future of Web Development with AI:
As AI continues to evolve, we can expect even more powerful tools that will further streamline the development process. However, it's important to remember that AI is a tool to enhance developer productivity, not replace developers. The future belongs to developers who can leverage AI effectively while maintaining code quality and security standards.`,
      date: "Sep 2025",
      readTime: "12 min read",
      category: "AI/ML",
      author: "Rajesh Thapa",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-12 text-center text-black">
          My Blogs
        </h1>

        {/* Blog Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-blue-200 bg-opacity-40 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
            <div className="w-full max-w-3xl bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-2xl my-8 relative">
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black z-10"
              >
                ✕
              </button>

              <div className="p-8 pt-12">
                <div className="mb-4">
                  <Badge className="bg-blue-600 text-white">{selectedBlog.category}</Badge>
                  <p className="text-sm text-gray-500 mt-2">{selectedBlog.date} • {selectedBlog.readTime}</p>
                </div>

                <h2 className="text-4xl font-bold text-black mb-6">{selectedBlog.title}</h2>

                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300">
                  <p className="text-sm text-gray-600">
                    Written by <strong>{selectedBlog.author}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900"
              onClick={() => setSelectedBlog(blog)}
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge className="bg-blue-600 text-white">{blog.category}</Badge>
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
                      setSelectedBlog(blog);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    Read <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}