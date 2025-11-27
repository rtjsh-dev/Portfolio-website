import AboutPage from "./AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Pratyoos, his skills, projects, and experiences.",
  keywords: ["About", "Pratyoos", "Projects", "Skills", "Experience", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "About",
    description: "Learn more about Pratyoos, his skills, projects, and experiences.",
    url: "https://pratyoos.com.np/about",
    siteName: "Pratyoos",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
