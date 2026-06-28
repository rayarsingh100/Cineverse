"use client";

import Link from "next/link";
import { ChevronDown, Search, Ticket } from "lucide-react";

const navLinks = [
    {
        label: "Movies",
        href: "/",
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
        <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-[1700px] items-center justify-between px-8 lg:px-16">
                {/* Left Section */}
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-3xl font-black tracking-tight text-white"
                    >
                        CineVerse <span className="text-red-500">🎬</span>
                    </Link>

                    {/* City Selector */}
                    <button className="hidden items-center gap-1 text-base font-medium text-zinc-300 transition hover:text-white md:flex">
                        Ahmedabad
                        <ChevronDown size={18} />
                    </button>
                </div>

                {/* Center Navigation */}
                <nav className="hidden items-center gap-16 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="relative text-lg font-semibold text-zinc-300 transition-all duration-300 hover:text-white"
                        >
                            {link.label}

                            {link.label === "Movies" && (
                                <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-red-500" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-5">
                    {/* Search */}
                    <button className="rounded-xl p-3 text-zinc-300 transition hover:bg-zinc-800 hover:text-white">
                        <Search size={22} />
                    </button>

                    {/* My Bookings */}
                    <Link
                        href="/my-bookings"
                        className="hidden items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-base font-semibold text-white transition hover:border-red-500 hover:bg-zinc-800 md:flex"
                    >
                        <Ticket size={18} />
                        My Bookings
                    </Link>

                    {/* Login */}
                    <button className="rounded-xl border border-zinc-700 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black">
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
}
