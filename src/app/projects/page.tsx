import ProjectsPage from "./ProjectsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse personal projects in backend, full stack, and more.",
  keywords: ["Projects", "Pratyoos", "Backend", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "Projects",
    description: "Browse personal projects in backend, full stack, and more.",
    url: "https://pratyoos.com.np/projects",
    siteName: "Pratyoos",
    type: "website",
  },
};

export default function Page() {
  return <ProjectsPage />;
}