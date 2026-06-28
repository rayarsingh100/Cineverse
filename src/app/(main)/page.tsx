import Navbar from "../../components/layout/navbar";
import MovieCard from "../../components/ui/MovieCard";
import { getNowPlayingMovies, getUpcomingMovies } from "../../lib/tmdb";
import type { Movie } from "../../types/tmdb";



export default async function HomePage() {
    const data1 = await getNowPlayingMovies();

    const movies1 = data1.results.slice(0, 5);

    const data2 = await getUpcomingMovies();

    const movies2 = data2.results.slice(0, 5);

    const heroMovie = data1.results[0];

    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950">
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Hero Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

                {/* Bottom Fade */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

                {/* Navbar */}
                <Navbar />

                {/* Hero Content */}
                <div className="relative z-10 flex min-h-screen items-center">
                    <div className="w-full px-6 pt-16 sm:px-10 lg:px-16">
                        <div className="max-w-3xl">
                            <div className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                                {/* Welcome Text */}
                                <p className="text-sm font-semibold tracking-[0.3em] text-red-500 sm:text-lg">
                                    NOW PLAYING IN THEATERS
                                </p>

                                {/* Movie Title */}
                                <h1 className="mt-5 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-8xl">
                                    {heroMovie.title}
                                </h1>

                                {/* Metadata */}
                                <div className="mt-5 flex flex-wrap items-center gap-3 text-2xl font-medium text-zinc-300">
                                    <span>
                                        {heroMovie.release_date?.split("-")[0]}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span className="text-yellow-400">
                                        ⭐ {heroMovie.vote_average.toFixed(1)}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
                                    {heroMovie.overview.slice(0, 180)}...
                                </p>

                                {/* Buttons */}
                                <div className="mt-10 flex flex-wrap gap-4">
                                    <button className="cursor-pointer rounded-xl bg-orange-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-700">
                                        Book Tickets
                                    </button>

                                    <button className="rounded-xl cursor-pointer border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10">
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
                    <MovieCard movies={movies1} />
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
                    <MovieCard movies={movies2} />
                </div>
            </section>
        </main>
    );
}
