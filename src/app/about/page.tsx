import AboutPage from "./AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Rajesh, his skills, projects, and experiences.",
  keywords: ["About", "Rajesh", "Projects", "Skills", "Experience", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "About",
    description: "Learn more about Rajesh, his skills, projects, and experiences.",
    url: "https://trajesh.com.np/about",
    siteName: "Rajesh",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
