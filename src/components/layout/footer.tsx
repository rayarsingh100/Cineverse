import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black text-zinc-300">
            {/* Main Footer */}
            <div className="mx-auto max-w-[1700px] px-5 py-14 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link
                            href="/"
                            className="text-2xl font-black tracking-tight text-white sm:text-3xl"
                        >
                            CineVerse <span className="text-red-500">🎬</span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
                            Your ultimate destination for discovering movies,
                            exploring theaters, and booking your next cinematic
                            experience.
                        </p>

                        {/* Social Icons */}
                        {/* Social Icons */}
                        <div className="mt-7 flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                            >
                                IG
                            </a>

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                            >
                                f
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                            >
                                X
                            </a>

                            <a
                                href="#"
                                aria-label="YouTube"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-zinc-300 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
                            >
                                ▶
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                            Explore
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="transition hover:text-white"
                                >
                                    Movies
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/"
                                    className="transition hover:text-white"
                                >
                                    Now Playing
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/"
                                    className="transition hover:text-white"
                                >
                                    Upcoming Movies
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-bookings"
                                    className="transition hover:text-white"
                                >
                                    My Bookings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                            Support
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Help Center
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Terms & Conditions
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Privacy Policy
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white">
                            Contact
                        </h3>

                        <div className="mt-5 space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="mt-0.5 shrink-0 text-red-500"
                                />

                                <span>
                                    Bengaluru, Karnataka
                                    <br />
                                    India
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail
                                    size={18}
                                    className="shrink-0 text-red-500"
                                />

                                <span>support@cineverse.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone
                                    size={18}
                                    className="shrink-0 text-red-500"
                                />

                                <span>+91 98765 43210</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:mt-16 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-lg font-bold text-white">
                                Ready for your next movie? 🍿
                            </p>

                            <p className="mt-1 text-sm text-zinc-400">
                                Discover what playing and book your seats today.
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex w-fit items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-500"
                        >
                            Explore Movies →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-[1700px] flex-col gap-2 px-5 py-6 text-xs text-zinc-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-16">
                    <p>
                        © {new Date().getFullYear()} CineVerse. All rights
                        reserved.
                    </p>

                    <p>Built with ❤️ for movie lovers.</p>
                </div>
            </div>
        </footer>
    );
}
