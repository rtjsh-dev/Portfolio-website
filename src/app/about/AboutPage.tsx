"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import profile_pic from "../../../public/profile_pic.png";
import QuoteOfTheDay from "@/components/Quotes";

const experience = [
  {
    title: "Frontend Developer, Sayapatri Group",
    description: "Build user interfaces and frontend systems using React.js and collaborate with teams to develop responsive web applications.",
    period: "Jun 2025 - Present",
  },
  {
    title: "Data Fellow, Code for Nepal",
    description: "Got access to DataCamp’s premium resources, incredible opportunity to sharpen my skills in data science, analysis, and visualization along with ML concepts.",
    period: "Oct 2025 - Present",
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
      {/* Heading */}
      <h1 className="text-5xl font-bold text-center text-black">About Me</h1>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-shrink-0 w-72 h-72 relative rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={profile_pic}
            alt="Profile Picture"
            width={288}
            height={288}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <div className="flex-1 space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Hello! I’m <strong>Rajesh</strong>, a passionate front-end developer and tech enthusiast.
            My journey started few years ago exploring programming fundamentals. Since then, I’ve mastered
            frontend development and exploring backend development with frameworks like <strong>React</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and <strong>Next.js</strong>.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            I also enjoy writing blogs and experimenting with solutions. I always explore new technologies,
            frameworks, and industry trends to deliver modern digital solutions.
          </p>
          <div className="flex gap-4">
            <a href="/cv.pdf" download>
              <Button variant="default" className="cursor-pointer">Download CV</Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" className="cursor-pointer">Contact Me</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-center text-black">Experience</h2>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="z-10 absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-300 -translate-x-1/2"></div>
          {experience.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-center mb-16"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-black rounded-full bg-white flex items-center justify-center z-10">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${hoveredIndex === index ? "bg-black" : "bg-white"}`}></div>
              </div>

              {/* Card */}
              <div
                className={`bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-2xl p-6 mt-6 md:mt-0 w-full md:w-1/2 transition-transform duration-500 hover:-translate-y-2 ${index % 2 === 0
                  ? "md:mr-auto md:text-right md:pr-12"
                  : "md:ml-auto md:text-left md:pl-12"
                  }`}
              >
                <p className="text-gray-700">
                  <strong className="text-lg">{item.title}</strong> <br />
                  {item.description} <br />
                  <span className="text-sm text-gray-500">{item.period}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {experience.map((item, index) => (
            <div
              key={index}
              className="flex items-start relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex-shrink-0 w-4 h-4 border-2 border-black rounded-full flex items-center justify-center z-10 relative">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${hoveredIndex === index ? "bg-black" : "bg-white"}`}></div>
              </div>
              {index !== experience.length - 1 && (
                <div className="absolute left-1.5 top-4 w-0.5 bg-gray-300 h-full"></div>
              )}
              <div className="ml-6 flex-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-2xl p-4 transition-transform duration-500 hover:-translate-y-1">
                <p className="text-gray-700">
                  <strong className="text-lg">{item.title}</strong> <br />
                  {item.description} <br />
                  <span className="text-sm text-gray-500">{item.period}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights / Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link href="/projects">
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-2xl font-bold">Projects</CardTitle>
            <CardDescription>Completed 10+ personal projects across frontend development and 2+ projects in full stack development.</CardDescription>
          </Card>
        </Link>
        <Link href="/certifications">
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-2xl font-bold">Certifications</CardTitle>
            <CardDescription>Earned 10+ certifications from platforms like Programiz and freeCodeCamp.</CardDescription>
          </Card>
        </Link>
        <Link href="/blogs">
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-2xl font-bold">Blogs</CardTitle>
            <CardDescription>Read my thoughts, tutorials, and experiences on web development and programming.</CardDescription>
          </Card>
        </Link>
      </div>

      {/* Education Timeline */}
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-center text-black">Education</h2>

        {/* Desktop Timeline*/}
        <div className="hidden md:block relative">
          <div className="z-10 absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-300 -translate-x-1/2"></div>
          {education.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row items-center mb-16"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 border-black rounded-full bg-white flex items-center justify-center z-10">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${hoveredIndex === index ? "bg-black" : "bg-white"}`}></div>
              </div>
              <div
                className={`bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-2xl p-6 mt-6 md:mt-0 w-full md:w-1/2 transition-transform duration-500 hover:-translate-y-2 ${index % 2 === 0
                  ? "md:mr-auto md:text-right md:pr-12"
                  : "md:ml-auto md:text-left md:pl-12"
                  }`}
              >
                <p className="text-gray-700">
                  <strong className="text-lg">{item.title}</strong> <br />
                  {item.description} <br />
                  <span className="text-sm text-gray-500">{item.period}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-6">
          {education.map((item, index) => (
            <div
              key={index}
              className="flex items-start relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex-shrink-0 w-4 h-4 border-2 border-black rounded-full flex items-center justify-center z-10 relative">
                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${hoveredIndex === index ? "bg-black" : "bg-white"}`}></div>
              </div>
              {index !== education.length - 1 && (
                <div className="absolute left-1.5 top-4 w-0.5 bg-gray-300 h-full"></div>
              )}
              <div className="ml-6 flex-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg hover:shadow-2xl p-4 transition-transform duration-500 hover:-translate-y-1">
                <p className="text-gray-700">
                  <strong className="text-lg">{item.title}</strong> <br />
                  {item.description} <br />
                  <span className="text-sm text-gray-500">{item.period}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      < QuoteOfTheDay />
    </div>
  );
}