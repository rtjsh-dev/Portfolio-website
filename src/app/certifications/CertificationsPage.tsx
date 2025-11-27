"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { certifications } from "../api/constants/certifications";

type Certification = {
  id: number;
  title: string;
  link: string;
  imageUrl: string;
  categories: string[];
  issuedDate: string;
};

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>(certifications);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const allCategories = Array.from(new Set(certs.flatMap((c) => c.categories)));
    setCategories(["All", ...allCategories]);
    setLoading(false);
  }, [certs]);

  const filteredCerts =
    selectedCategory === "All"
      ? certs
      : certs.filter((cert) => cert.categories.includes(selectedCategory));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-8 text-center text-black">
        My Certifications
      </h1>

      {/* Loading / Error */}
      {loading && <p className="text-center text-gray-500">Loading certifications...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Categories */}
          <div className="mb-5">
            <div className="sm:hidden mb-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-gray-200 cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCerts.map((cert, index) => (
              <Card key={cert.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col bg-gradient-to-r from-blue-50 to-blue-100">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View certification: ${cert.title}`}
                  className="relative w-full aspect-[4/3] group overflow-hidden"
                >
                  <Image
                    src={cert.imageUrl}
                    alt={cert.title}
                    width={1600}
                    height={1200}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      View
                    </span>
                  </div>
                </a>

                <CardContent className="text-center">
                  <CardTitle className="text-lg font-semibold text-black mb-2">
                    {cert.title}
                  </CardTitle>

                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    {cert.categories.map((cat, index) => (
                      <Badge key={index} variant="secondary">
                        {cat}
                      </Badge>
                    ))}
                  </div>

                  <CardDescription className="text-sm text-gray-600">
                    Issued Date: {formatDate(cert.issuedDate)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCerts.length === 0 && (
            <p className="text-center text-gray-500">No certifications found for this category.</p>
          )}
        </>
      )}
    </div>
  );
}