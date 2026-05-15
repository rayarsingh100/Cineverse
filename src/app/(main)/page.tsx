import Navbar from "../../components/layout/navbar";
import MovieCard from "../../components/ui/MovieCard";

export default function HomePage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950">
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Hero Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('https://wallpapercat.com/w/full/0/c/f/46439-1920x1080-desktop-1080p-squid-game-background.jpg')",
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/45" />

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

                {/* Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

                {/* Navbar */}
                <Navbar />

                {/* Hero Content */}
                <div className="relative z-10 flex min-h-screen items-center">
                    <div className="w-full px-6 pt-16 sm:px-10 lg:px-16">
                        {/* Content Container */}
                        <div className="max-w-3xl">
                            {/* Glass Wrapper */}
                            <div className="rounded-3xl border border-white/1 bg-black/20 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                                {/* Welcome Text */}
                                <p className="text-sm font-semibold tracking-[0.3em] text-red-500 sm:text-base">
                                    WELCOME TO CINEVERSE
                                </p>

                                {/* Movie Title */}
                                <h1 className="mt-5 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-8xl">
                                    Squid Game - Season 3
                                </h1>

                                {/* Metadata */}
                                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-300">
                                    <span>2025</span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span>Thriller</span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span>Survival</span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span className="text-yellow-400">
                                        ⭐ 4.9
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
                                    Book tickets for the latest blockbusters,
                                    discover premium theaters, and enjoy a
                                    cinematic experience designed for movie
                                    lovers.
                                </p>

                                {/* Buttons */}
                                <div className="mt-10 flex flex-wrap gap-4">
                                    {/* Book Tickets */}
                                    <button className="cursor-pointer rounded-xl bg-orange-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-700">
                                        Book Tickets
                                    </button>

                                    {/* Watch Trailer */}
                                    <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10">
                                        Watch Trailer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-zinc-400">
                        <p className="text-sm tracking-wide">
                            Scroll to Explore
                        </p>

                        <span className="mt-2 animate-bounce text-xl">↓</span>
                    </div>
                </div>
            </section>

            {/* Now Playing Section */}
            <section className="relative z-20 bg-zinc-950 px-6 py-24 sm:px-10 lg:px-16">
                {/* Section Heading */}
                <div>
                    <p className="text-sm font-semibold tracking-widest text-red-500">
                        NOW IN THEATERS
                    </p>

                    <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
                        Now Playing
                    </h1>

                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Experience movies currently running in theaters with
                        premium cinematic booking experience.
                    </p>
                </div>

                {/* Movie Cards */}
                <div className="mt-14">
                    <MovieCard />
                </div>
            </section>

            <section className="relative z-20 bg-zinc-950 px-6  sm:px-10 lg:px-16">
                {/* Section Heading */}
                <div>
                    <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">
                        Upcoming Movies
                    </h1>

                    <p className="mt-4 max-w-2xl text-zinc-400">
                        Experience movies currently running in theaters with
                        premium cinematic booking experience.
                    </p>
                </div>

                {/* Movie Cards */}
                <div className="mt-14">
                    <MovieCard />
                </div>
            </section>
        </main>
    );
}
