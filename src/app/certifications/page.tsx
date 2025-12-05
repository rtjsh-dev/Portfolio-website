import CertificationsPage from "./CertificationsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "View the certifications earned by Rajesh in programming, web development, and full stack projects.",
  keywords: ["Certifications", "Rajesh", "Programming", "Web Development", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "Certifications",
    description: "View the certifications earned by Rajesh in programming, web development, and full stack projects.",
    url: "https://trajesh.com.np/certifications",
    siteName: "Rajesh",
    type: "website",
  },
};

export default function Page() {
  return <CertificationsPage />;
}