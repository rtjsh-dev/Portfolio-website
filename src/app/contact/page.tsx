import ContactPage from "./ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Pratyoos for collaborations, projects, or a friendly chat.",
  keywords: ["Contact", "Pratyoos", "Projects", "Collaboration", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "Contact",
    description: "Get in touch with Pratyoos for collaborations, projects, or a friendly chat.",
    url: "https://pratyoos.com.np/contact",
    siteName: "Pratyoos",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}