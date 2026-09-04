"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    Search,
    Ticket,
    Menu,
    X,
    User,
    LogOut,
} from "lucide-react";

type SearchMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
};

type SessionUser = {
    userId: string;
    email: string;
    name: string;
};

const navLinks = [
    { label: "Movies", href: "/" },
    { label: "Theaters", href: "#" },
    { label: "Offers", href: "#" },
];

export default function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchMovie[]>([]);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState<SessionUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    // =====================================================
    // CHECK LOGIN SESSION
    // =====================================================

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await fetch("/api/auth/me");

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Session check failed:", error);
                setUser(null);
            } finally {
                setAuthLoading(false);
            }
        }

        checkSession();
    }, []);

    // =====================================================
    // LOGOUT
    // =====================================================

    async function handleLogout() {
        try {
            setLogoutLoading(true);

            const response = await fetch("/api/auth/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Logout failed");
            }

            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLogoutLoading(false);
        }
    }

    // =====================================================
    // FOCUS SEARCH INPUT WHEN OPENED
    // =====================================================

    useEffect(() => {
        if (searchOpen) {
            inputRef.current?.focus();
        }
    }, [searchOpen]);

    // =====================================================
    // CLOSE SEARCH WITH ESCAPE
    // =====================================================

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setSearchOpen(false);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // =====================================================
    // SEARCH MOVIES WHILE TYPING
    // =====================================================

    useEffect(() => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            setResults([]);
            setLoading(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/search?query=${encodeURIComponent(trimmedQuery)}`,
                );

                if (!response.ok) {
                    throw new Error("Search failed");
                }

                const data = await response.json();

                setResults(data.results?.slice(0, 6) ?? []);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    // =====================================================
    // CLOSE SEARCH
    // =====================================================

    function closeSearch() {
        setSearchOpen(false);
        setQuery("");
        setResults([]);
    }

    // =====================================================
    // SEARCH SUBMIT
    // =====================================================

    function handleSearchSubmit() {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return;
        }

        window.location.href = `/search?query=${encodeURIComponent(
            trimmedQuery,
        )}`;
    }

    // =====================================================
    // NAVBAR
    // =====================================================

    return (
        <>
            <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-[1700px] items-center justify-between px-4 sm:h-18 sm:px-6 lg:h-20 lg:px-16">
                    {/* LOGO + LOCATION */}

                    <div className="flex min-w-0 items-center gap-4 lg:gap-10">
                        <Link
                            href="/"
                            className="shrink-0 text-2xl font-black tracking-tight text-white sm:text-3xl"
                        >
                            CineVerse <span className="text-red-500">🎬</span>
                        </Link>

                        <button className="hidden items-center gap-1 text-base font-medium text-zinc-300 transition hover:text-white md:flex">
                            Ahmedabad
                            <ChevronDown size={18} />
                        </button>
                    </div>

                    {/* DESKTOP NAVIGATION */}

                    <nav className="hidden items-center gap-8 lg:flex xl:gap-16">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="relative text-base font-semibold text-zinc-300 transition-all duration-300 hover:text-white xl:text-lg"
                            >
                                {link.label}

                                {link.label === "Movies" && (
                                    <span className="absolute -bottom-3 left-0 h-0.5 w-full bg-red-500" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* RIGHT ACTIONS */}

                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
                        {/* SEARCH */}

                        <button
                            onClick={() => setSearchOpen(true)}
                            className="rounded-xl p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:p-3"
                            aria-label="Search movies"
                        >
                            <Search
                                size={20}
                                className="sm:h-[22px] sm:w-[22px]"
                            />
                        </button>

                        {/* MY BOOKINGS */}

                        <Link
                            href="/my-bookings"
                            className="hidden items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-zinc-800 md:flex lg:px-5 lg:py-3 lg:text-base"
                        >
                            <Ticket size={18} />
                            <span>My Bookings</span>
                        </Link>

                        {/* LOGIN */}

                        {!authLoading && !user && (
                            <Link
                                href="/login"
                                className="rounded-xl border border-zinc-700 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black sm:px-5 lg:px-6 lg:py-3 lg:text-base"
                            >
                                Login
                            </Link>
                        )}

                        {/* LOGGED-IN USER */}

                        {!authLoading && user && (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/my-bookings"
                                    className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-red-500/20 sm:px-5 lg:py-3 lg:text-base"
                                >
                                    <User size={18} />

                                    <span className="hidden sm:inline">
                                        Hi, {user.name.split(" ")[0]}
                                    </span>

                                    <span className="sm:hidden">Profile</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    disabled={logoutLoading}
                                    className="hidden items-center gap-2 rounded-xl border border-zinc-700 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-red-500 hover:bg-red-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
                                >
                                    <LogOut size={17} />

                                    {logoutLoading
                                        ? "Logging out..."
                                        : "Logout"}
                                </button>
                            </div>
                        )}

                        {/* MOBILE MENU */}

                        <button
                            className="rounded-xl border border-zinc-700 bg-white/5 p-2.5 text-zinc-300 transition hover:bg-zinc-800 hover:text-white md:hidden"
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </button>
                    </div>
                </div>
            </header>

            {/* ========================================================= */}
            {/* SEARCH OVERLAY */}
            {/* ========================================================= */}

            {searchOpen && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl">
                    <div className="mx-auto max-w-5xl px-5 pt-24 sm:px-8 sm:pt-28">
                        {/* SEARCH HEADER */}

                        <div className="flex items-center gap-3">
                            <div className="relative flex-1">
                                <Search
                                    size={22}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
                                />

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" &&
                                            query.trim()
                                        ) {
                                            handleSearchSubmit();
                                        }
                                    }}
                                    placeholder="Search movies..."
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-red-500/50 focus:bg-white/[0.07] sm:py-5 sm:text-lg"
                                />
                            </div>

                            <button
                                onClick={closeSearch}
                                className="rounded-xl border border-white/10 bg-white/5 p-3 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                                aria-label="Close search"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        {/* SEARCH STATUS */}

                        {query.trim() && (
                            <div className="mt-8">
                                {loading && (
                                    <p className="text-sm text-zinc-500">
                                        Searching CineVerse...
                                    </p>
                                )}

                                {!loading && results.length === 0 && (
                                    <div className="py-16 text-center">
                                        <p className="text-4xl">🎬</p>

                                        <p className="mt-4 text-lg font-semibold text-white">
                                            No movies found
                                        </p>

                                        <p className="mt-2 text-sm text-zinc-500">
                                            Try searching for another movie.
                                        </p>
                                    </div>
                                )}

                                {!loading && results.length > 0 && (
                                    <>
                                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                            Search Results
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                            {results.map((movie) => (
                                                <Link
                                                    key={movie.id}
                                                    href={`/movies/${movie.id}`}
                                                    onClick={closeSearch}
                                                    className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-red-500/40"
                                                >
                                                    <div className="aspect-[2/3] overflow-hidden bg-zinc-900">
                                                        {movie.poster_path ? (
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                                alt={
                                                                    movie.title
                                                                }
                                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full items-center justify-center text-3xl text-zinc-700">
                                                                🎬
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="p-3">
                                                        <h3 className="line-clamp-2 text-sm font-semibold text-white">
                                                            {movie.title}
                                                        </h3>

                                                        <p className="mt-1 text-xs text-zinc-500">
                                                            {movie.release_date
                                                                ? movie.release_date.slice(
                                                                      0,
                                                                      4,
                                                                  )
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* EMPTY SEARCH STATE */}

                        {!query.trim() && (
                            <div className="flex flex-col items-center justify-center py-28 text-center">
                                <div className="text-6xl">🎬</div>

                                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                                    Search CineVerse
                                </h2>

                                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                                    Find your next movie, explore details, and
                                    book your perfect seats.
                                </p>

                                <p className="mt-6 text-xs text-zinc-600">
                                    Press Enter to view all search results
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
