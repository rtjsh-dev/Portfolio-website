"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-6 bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center text-center text-black dark:text-white text-sm">
          <p className="text-sm">
          &copy; {new Date().getFullYear()} Made with ❤️ by{" "}
          <Link
            href="https://github.com/rtjsh-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white px-2 py-1 rounded transition-colors underline"
          >
          Rajesh
          </Link>
        </p>
      </div>
    </footer>
  );
}
