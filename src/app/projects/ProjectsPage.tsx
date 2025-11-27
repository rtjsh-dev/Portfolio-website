"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { projectsData } from "../api/constants/projects";

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  order: number;
  categories: string[];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const allCategories = Array.from(new Set(projects.flatMap((p) => p.categories)));
    setCategories(["All", ...allCategories]);
    setLoading(false);
  }, [projects]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(selectedCategory));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-8 text-center text-black">
        My Projects
      </h1>

      {/* Loading / Error States */}
      {loading && (
        <p className="text-center text-gray-500">Loading projects...</p>
      )}
      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

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

          {/* Projects Grid */}
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProjects.map((proj, index) => (
              <Card
                key={proj.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col bg-gradient-to-r from-blue-50 to-blue-100"
              >
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full aspect-[16/9] group overflow-hidden"
                >
                  <Image
                    src={proj.imageUrl}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    {proj.title}
                  </CardTitle>

                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    {proj.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" >
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <CardDescription className="text-sm text-gray-600">
                    {proj.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}