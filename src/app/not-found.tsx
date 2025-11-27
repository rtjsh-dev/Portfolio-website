import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold mb-4 animate-bounce text-black dark:text-white">
        404 Not Found
      </h1>
      <p className="text-gray-500 mb-6">
        Looks like you've ventured into the unknown digital realm.
      </p>
      <Link href="/about" prefetch={false}>
        <button className="bg-black text-white rounded-md px-6 py-2 hover:bg-gray-800 transition cursor-pointer">
          Return Home
        </button>
      </Link>
    </div>
  );
}