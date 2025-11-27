import type { Metadata } from "next";
import { Roboto, Playfair_Display, Inter } from "next/font/google"; 
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "sonner";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Rajesh Thapa",
  description: "Personal portfolio of Rajesh Thapa showcasing projects, blogs, skills, and contact information built with Next.js.",
  keywords: ["Rajesh Thapa", "Portfolio", "Full Stack", "React", "Next.js", "Backend Projects", "Web Development"],
  openGraph: {
    title: "Rajesh Thapa",
    description: "Personal portfolio of Rajesh Thapa showcasing projects, blogs, skills, and contact information built with Next.js.",
    url: "https://trajesh.com.np",
    siteName: "Rajesh Thapa",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
        <Toaster position="top-center" />
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}