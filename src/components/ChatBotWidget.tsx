"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import ChatBot from "@/components/ChatBot";

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:right-5 sm:left-auto sm:items-end sm:px-0">
      {open && (
        <div className="mb-3 w-full max-w-[380px] h-[560px] max-h-[calc(100vh-5rem)] rounded-3xl shadow-2xl bg-white/95 dark:bg-slate-900/90 ring-1 ring-slate-200 dark:ring-slate-700 backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700/80 bg-slate-950/95 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center rounded-2xl bg-slate-700 p-2 text-white">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Portfolio Chat</p>
                <p className="text-xs text-slate-300">Ask about projects, skills, or contact info.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex h-full flex-col overflow-hidden">
            <ChatBot onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl transition hover:bg-slate-800"
      >
        <MessageSquare className="h-5 w-5" />
        {open ? "Close chat" : "Chat with me"}
      </button>
    </div>
  );
}
