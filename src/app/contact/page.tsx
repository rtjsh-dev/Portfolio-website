import ContactPage from "./ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rajesh for collaborations, projects, or a friendly chat.",
  keywords: ["Contact", "Rajesh", "Projects", "Collaboration", "Full Stack", "React", "Next.js"],
  openGraph: {
    title: "Contact",
    description: "Get in touch with Rajesh for collaborations, projects, or a friendly chat.",
    url: "https://trajesh.com.np/contact",
    siteName: "Rajesh",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}