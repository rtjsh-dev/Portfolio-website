"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! I'm available 24/7. Ask me anything about the portfolio, projects, or skills.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: [...messages, userMessage] }),
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error("Chat API returned invalid JSON:", responseText);
        data = { error: responseText || "Invalid response from chat service." };
      }

      if (!response.ok) {
        const errorMessage = data?.error || data?.message || "Unable to get a response.";
        throw new Error(errorMessage);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || data?.message || "Sorry, I couldn't generate a response right now.",
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error(message);
      setMessages((current) => [
        ...current,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            "I couldn't send your message right now. Please try again or use the contact form below to reach out directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendMessage(input);
  };

  const handleTextareaKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await sendMessage(input);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="shadow-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle>24/7 AI Chatbot</CardTitle>
              <CardDescription>
                Talk to the AI assistant anytime for help with the portfolio, projects, and workflow.
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6 max-h-[420px] overflow-y-auto pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-2xl p-4 ${message.role === "user"
                ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 self-end"
                : "bg-slate-900 text-white dark:bg-slate-800 dark:text-white"
                }`}
            >
              <div className="text-sm font-medium capitalize mb-2">{message.role === "user" ? "You" : "Assistant"}</div>
              <p className="whitespace-pre-line text-sm leading-6">{message.content}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="space-y-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <Textarea
                id="chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Ask the AI assistant about the portfolio, skills, or project ideas..."
                className="resize-none flex-1"
                rows={4}
                required
              />
              <Button type="submit" disabled={loading} className="min-w-[56px] self-end rounded-full p-4" aria-label="Send message">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Send className="h-4 w-4 animate-pulse" />
                  </span>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
