"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      <h1 className="text-5xl font-bold mb-8 text-center text-black dark:text-white">
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
                onClick={() => setSelectedProject(proj)}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col bg-white dark:bg-gray-900 cursor-pointer"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={proj.imageUrl}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    priority={index < 3}
                  />
                </div>

                <CardContent className="text-center">
                  <CardTitle className="text-lg font-semibold text-black dark:text-white mb-2">
                    {proj.title}
                  </CardTitle>

                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    {proj.categories.map((category, idx) => (
                      <Badge key={idx} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
              <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl my-8 relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white z-10"
                  aria-label="Close"
                >
                  ✕
                </button>

                <div className="p-6 pt-12">
                  <div className="mb-4">
                    <div className="w-full h-64 relative rounded overflow-hidden">
                      <Image src={selectedProject.imageUrl} alt={selectedProject.title} fill className="object-cover w-full h-full" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedProject.categories.map((c, i) => (
                        <Badge key={i} variant="secondary">{c}</Badge>
                      ))}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedProject.description}</p>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <Button onClick={() => setSelectedProject(null)} variant="outline">
                      Close
                    </Button>
                    <Button
                      onClick={() => window.open(selectedProject.link, "_blank")}
                      variant="outline"
                    >
                      View Live
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}