import type { Metadata } from "next";
import { Roboto, Playfair_Display, Inter } from "next/font/google"; 
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/context/ThemeContext";

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
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Science+Gothic:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${roboto.className} bg-white dark:bg-gray-900 transition-colors`}>
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4">{children}</main>
          <Toaster position="top-center" />
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}