"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const links = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/certifications", label: "Certifications" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="w-full border-b">
      <div className="container mx-auto flex items-center justify-center h-14 px-4 relative">
        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 transition-colors rounded-md`}
                >
                  <Link href={link.href} className="text-lg">
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden absolute right-4 p-2 rounded hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-black border-t">
          <ul className="flex flex-col gap-4 px-4 py-4 items-center">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-lg text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors block"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}