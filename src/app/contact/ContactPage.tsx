"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        // show server-provided message when available
        const serverMsg = payload?.message || payload?.error || "Failed to submit form";
        console.error("Contact form error:", payload, res.status);
        toast.error(serverMsg as string);
        return;
      }

      form.reset();
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Contact submit exception:", error);
      // show error message when available
      const message = error instanceof Error ? error.message : "Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 md:px-24 flex flex-col gap-20">
      {/* Get in Touch Section - redesigned */}
      <section className="max-w-7xl mx-auto w-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Intro + CTA */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white">
              Let's build something together
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed">
              Whether you have a project idea, want to collaborate, or need help
              with a technical problem — I'm one message away. Tell me about
              your goals and I'll get back with a clear plan.
            </p>

            {/* CTAs and social icons removed per request */}
          </div>

          {/* Right: Profile card */}
          <div>
              <Card className="shadow-xl overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <div className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                  {/* small profile image */}
                  <img src="/profile_pic.png" alt="Profile" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Rajesh Thapa</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Front-end developer • Web & APIs</p>

                  <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-gray-800 dark:text-gray-200">rajesh025thapa@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-gray-800 dark:text-gray-200">+977 9843275701</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-gray-800 dark:text-gray-200">Okhaldhunga, Nepal</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button className="px-4 py-2" onClick={() => {
                      const el = document.getElementById('contact-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}>Message</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

  {/* Contact Form Section */}
  <section id="contact-form" className="flex justify-center">
        <Card className="w-full max-w-xl shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-xl">Send Me a Message</CardTitle>
            <CardDescription className="text-md">
              Fill out the form and I will get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col space-y-1">
                <Label htmlFor="name" className="text-md">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="text-md py-5"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="text-md">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mail@email.com"
                  className="text-md py-5"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="subject" className="text-md">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="text-md py-5"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="message" className="text-md">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message..."
                  className="text-md py-5"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                variant="default"
                className="mt-4 text-md py-3"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Social Links Section */}
      <section className="text-center flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-black dark:text-white">Connect With Me</h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-black dark:text-white" />
            <a
              href="mailto:pratyoospanta@gmail.com"
              className="text-black dark:text-white text-md hover:text-black dark:hover:text-gray-300 transition"
            >
              rajesh025thapa@gmail.com
            </a>
          </div>

            <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-black dark:text-white" />
            <a
              href="tel:+9779863481055"
              className="text-black dark:text-white text-md hover:text-black dark:hover:text-gray-300 transition"
            >
              +977 9843275701
            </a>
          </div>

            <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-black dark:text-white" />
            <a
              href="https://maps.app.goo.gl/HLnc5TyUut37TSAE6"
              
              className="text-black dark:text-white text-md hover:text-black dark:hover:text-gray-300 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Okhaldhunga, Nepal
            </a>
          </div>
        </div>

          <div className="flex justify-center gap-6 mt-4 text-lg">
          <a
            href="https://github.com/rtjsh-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-black dark:text-white hover:text-black dark:hover:text-gray-300 transition transform hover:scale-110"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/rtjsh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-black dark:text-white hover:text-black dark:hover:text-gray-300 transition transform hover:scale-110"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com/_rt1s__/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-black dark:text-white hover:text-black dark:hover:text-gray-300 transition transform hover:scale-110"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://discord.com/users/razesh_06878"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="hover:text-black transition transform hover:scale-110"
          >
            <FaDiscord className="w-6 h-6" />
          </a>
        </div>
      </section>
    </div>
  );
}