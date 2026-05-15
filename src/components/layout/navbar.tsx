"use client";

import { ChevronDown, Search } from "lucide-react";

const navLinks = [
  {
    label: "Movies",
    href: "#",
  },
  {
    label: "Theaters",
    href: "#",
  },
  {
    label: "Offers",
    href: "#",
  },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      {/* Wider Cinematic Container */}
      <div className="mx-auto flex h-20 max-w-400 items-center justify-between px-10 lg:px-16">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <h1 className="text-3xl font-bold tracking-tight text-white">
            CineVerse <span className="text-red-500">🎬</span>
          </h1>

          {/* City Selector */}
          <button className="hidden items-center gap-1 text-base font-medium text-zinc-300 transition-all duration-300 hover:text-white md:flex">
            Ahmedabad
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-14 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-base font-medium text-zinc-300 transition-all duration-300 hover:text-white"
            >
              {link.label}

              {/* Active Link */}
              {link.label === "Movies" && (
                <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-red-500" />
              )}
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Search Button */}
          <button className="text-zinc-300 transition-all duration-300 hover:text-white">
            <Search size={22} />
          </button>

          {/* Login Button */}
          <button className="rounded-xl border border-zinc-700 bg-white/5 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
