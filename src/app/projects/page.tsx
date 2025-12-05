import ProjectsPage from "./ProjectsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse personal projects in backend, full stack, and more.",
  keywords: ["Projects", "Rajesh", "Backend", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "Projects",
    description: "Browse personal projects in backend, full stack, and more.",
    url: "https://trajesh.com.np/projects",
    siteName: "Rajesh",
    type: "website",
  },
};

export default function Page() {
  return <ProjectsPage />;
}