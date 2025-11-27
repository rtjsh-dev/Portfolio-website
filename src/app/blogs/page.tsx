import BlogsPage from "./BlogsPage";

export const metadata = {
  title: "Blogs",
  description: "Read personal blogs about programming, web development, and full stack projects.",
  keywords: ["Blogs", "Programming", "Web Development", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "Blogs",
    description: "Read personal blogs about programming, web development, and full stack projects.",
    url: "https://pratyoos.com.np/blogs",
    siteName: "Pratyoos",
    type: "website",
  },
};

export default function Page() {
  return <BlogsPage />;
}