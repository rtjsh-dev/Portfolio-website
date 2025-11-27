import CertificationsPage from "./CertificationsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "View the certifications earned by Pratyoos in programming, web development, and full stack projects.",
  keywords: ["Certifications", "Pratyoos", "Programming", "Web Development", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "Certifications",
    description: "View the certifications earned by Pratyoos in programming, web development, and full stack projects.",
    url: "https://pratyoos.com.np/certifications",
    siteName: "Pratyoos",
    type: "website",
  },
};

export default function Page() {
  return <CertificationsPage />;
}