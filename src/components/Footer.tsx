"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-6 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex flex-col items-center text-center text-black text-sm">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Made with ❤️ by{" "}
          <Link
            href="https://github.com/rtjsh-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 px-2 py-1 rounded transition-colors"
          >
            Rajesh
          </Link>
        </p>
      </div>
    </footer>
  );
}
