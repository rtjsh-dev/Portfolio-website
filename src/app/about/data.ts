export const profileInfo = {
  name: "Rajesh Thapa",
  title: "Frontend Developer",
  tagline: "I build modern, accessible, and responsive user interfaces with React and Next.js.",
  bio: "I build modern, accessible, and responsive user interfaces using React, Next.js and Tailwind CSS. I enjoy turning complex problems into simple, beautiful designs and learning new technologies along the way.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "Git",
  ],
  strengths: [
    "UI/UX design",
    "Responsive web development",
    "Performance optimization",
    "Team collaboration",
  ],
};

export const experience = [
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
    description: "Lead a dynamic team dedicated to fostering technical excellence and professional growth within the student community.",
    period: "Feb 2025 - Present",
  },
];

export const education = [
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

export const contactInfo = {
  email: "rajesh025thapa@gmail.com",
  github: "https://github.com/rtjsh-dev",
  linkedin: "https://www.linkedin.com/in/rtjsh",
  instagram: "https://instagram.com/_rt1s__/",
  discord: "https://discord.com/users/razesh_06878",
};

// Re-export projects and certifications from the existing constants
import { projectsData } from "../api/constants/projects";
import { certifications } from "../api/constants/certifications";

export const projects = projectsData;
export const certificationsList = certifications;

// Helper to fetch latest blog summaries from the blogs API
export async function fetchBlogs() {
  try {
    const res = await fetch("/api/blogs");
    if (!res.ok) return [];
    const data = await res.json();
    return data;
  } catch (err) {
    return [];
  }
}
