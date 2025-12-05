"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiGit } from "react-icons/si";
import { MdDevices } from "react-icons/md";
import { FaGithub, FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";

import profile_pic from "../../../public/profile_pic.png";
import QuoteOfTheDay from "@/components/Quotes";
import AnimatedNumber from "@/components/AnimatedNumber";
import { projectsData } from "../api/constants/projects";
import { certifications } from "../api/constants/certifications";

const experience = [
  {
    title: "Data Fellow, EXCESS",
    description: "Got access to DataCamp’s premium resources, incredible opportunity to sharpen my skills in data science, analysis, and visualization along with ML concepts.",
    period: "Dec 2025 - Present",
  },
  {
    title: "Frontend Developer, Sayapatri Group",
    description: "Build user interfaces and frontend systems using React.js and collaborate with teams to develop responsive web applications.",
    period: "Jun 2025 - Present",
  },
  {
    title: "Technical Coordinator, ACES",
    description: "Lead a dynamic team dedicated to fostering technical excellence and professional growth within the student community",
    period: "Feb 2025 - Present",
  }
];

const education = [
  {
    title: "B.E. Computer Engineering",
    description: "Tribhuvan University, IOE Purwanchal Campus",
    period: "2023 - Present",
  },
  {
    title: "+2 Science",
    description: "Kathmandu Model College",
    period: "2020 - 2022",
  },
  {
    title: "Secondary Education",
    description: "Lali Guransh English Secondary School",
    period: "2010 - 2020",
  },
];

export default function AboutPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const statsRef = useRef<HTMLElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      {/* <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold">About Me</h1>
        <p className="mt-2 text-gray-600">A brief introduction, my skills, experience and education.</p>
      </div> */}

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
        <div className="col-span-1 flex items-center md:items-start justify-center md:justify-start">
          <Card className="w-80 shadow-2xl overflow-hidden h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <div className="p-6 flex flex-col items-center gap-4 h-full">
              <div className="w-52 h-52 rounded-xl overflow-hidden">
                <Image src={profile_pic} alt="Profile" width={208} height={208} className="object-cover w-full h-full" priority />
              </div>

              <div className="text-center mt-2">
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">Rajesh Thapa</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">Frontend Developer</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">"Life has no Ctrl+Z."</p>
              </div>

              <div className="flex items-center justify-center gap-4 mt-3 text-lg">
                <a href="https://github.com/rtjsh-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#F05032] transition transform hover:scale-110">
                  <FaGithub className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/rtjsh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#0A66C2] transition transform hover:scale-110">
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a href="https://instagram.com/_rt1s__/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#E1306C] transition transform hover:scale-110">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="https://discord.com/users/razesh_06878" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="hover:text-[#5865F2] transition transform hover:scale-110">
                  <FaDiscord className="w-6 h-6" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hi, I'm Rajesh 👋</h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
              I build modern, accessible, and responsive user interfaces using React, Next.js and Tailwind CSS. I enjoy turning complex problems into simple, beautiful designs and learning new technologies along the way.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/cv.pdf" download>
                <Button variant="default">Download CV</Button>
              </a>
              <Link href="/contact">
                <Button variant="outline">Contact Me</Button>
              </Link>
            </div>
          </div>

          {/* Area of Expertise */}
          <Card className="p-4 h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardTitle className="text-lg text-gray-900 dark:text-white">Area of Expertise</CardTitle>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "React", icon: SiReact, url: "https://reactjs.org/", color: "#61DAFB" },
                { name: "Next.js", icon: SiNextdotjs, url: "https://nextjs.org/", color: "#000000" },
                { name: "TypeScript", icon: SiTypescript, url: "https://www.typescriptlang.org/", color: "#3178C6" },
                { name: "Tailwind", icon: SiTailwindcss, url: "https://tailwindcss.com/", color: "#06B6D4" },
                { name: "Node.js", icon: SiNodedotjs, url: "https://nodejs.org/", color: "#339933" },
                { name: "Express", icon: SiExpress, url: "https://expressjs.com/", color: "#000000" },
                { name: "Git", icon: SiGit, url: "https://git-scm.com/", color: "#F05032" },
                { name: "Responsive UI", icon: MdDevices, url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design", color: "#7C3AED" },
              ].map((tech) => {
                const Icon = tech.icon as any;
                // use group hover so the icon color changes on tile hover
                return (
                  <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center justify-center gap-2 rounded-lg p-3 hover:shadow-md transition-shadow text-center bg-transparent"
                    aria-label={tech.name}
                    title={tech.name}
                  >
                    <Icon size={28} className={`text-gray-800 dark:text-gray-200 transition-colors duration-200 group-hover:text-[${tech.color}]`} />
                    <span className="text-xs text-gray-700 dark:text-gray-300">{tech.name}</span>
                  </a>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* Experience as cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experience.map((item, idx) => (
            <Card key={idx} className="p-6 hover:shadow-xl transition-shadow bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardTitle className="text-lg text-gray-900 dark:text-white">{item.title}</CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</CardDescription>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">{item.period}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Highlights / Stats */}
      <section className="mb-12" ref={statsRef}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/projects">
            <Card className="text-center p-6 hover:shadow-xl transition-shadow bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-1">
                  <AnimatedNumber value={projectsData.length} start={statsVisible} className="text-4xl md:text-5xl font-extrabold text-black dark:text-white" />
                  <span className="text-4xl md:text-5xl font-extrabold text-black dark:text-white">+</span>
                </div>
                <CardTitle className="text-lg font-semibold mt-3">Projects</CardTitle>
              </div>
            </Card>
          </Link>

          <Link href="/certifications">
            <Card className="text-center p-6 hover:shadow-xl transition-shadow bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-1">
                  <AnimatedNumber value={certifications.length} start={statsVisible} className="text-4xl md:text-5xl font-extrabold text-black dark:text-white" />
                  <span className="text-4xl md:text-5xl font-extrabold text-black dark:text-white">+</span>
                </div>
                <CardTitle className="text-lg font-semibold mt-3">Certifications</CardTitle>
              </div>
            </Card>
          </Link>

          <Link href="/blogs">
            <Card className="text-center p-6 hover:shadow-xl transition-shadow bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-1">
                  <AnimatedNumber value={3} start={statsVisible} className="text-4xl md:text-5xl font-extrabold text-black dark:text-white" />
                  <span className="text-4xl md:text-5xl font-extrabold text-black dark:text-white">+</span>
                </div>
                <CardTitle className="text-lg font-semibold mt-3">Blogs</CardTitle>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Education</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {education.map((item, idx) => (
            <div key={idx} className="flex-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 shadow">
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{item.period}</div>
            </div>
          ))}
        </div>
      </section>

      <QuoteOfTheDay />
    </div>
  );
}