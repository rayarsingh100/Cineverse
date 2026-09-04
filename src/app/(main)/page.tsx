import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import MovieCard from "../../components/ui/MovieCard";
import RandomHero from "../../components/home/RandomHero";
import { getNowPlayingMovies, getUpcomingMovies } from "../../lib/tmdb";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const data1 = await getNowPlayingMovies();
    const data2 = await getUpcomingMovies();

    const movies1 = data1.results.slice(0, 5);
    const movies2 = data2.results.slice(0, 5);

    // First 5 now-playing movies are given to RandomHero.
    // RandomHero selects one movie in the browser.
    const heroMovies = data1.results.slice(0, 5);

    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950">
            {/* ===================================================== */}
            {/* NAVBAR */}
            {/* ===================================================== */}

            <Navbar />

            {/* ===================================================== */}
            {/* HERO */}
            {/* ===================================================== */}

            <RandomHero movies={heroMovies} />

            {/* ===================================================== */}
            {/* NOW PLAYING */}
            {/* ===================================================== */}

            <section
                className="
                    relative
                    z-20
                    bg-zinc-950
                    px-4
                    py-16
                    sm:px-8
                    sm:py-20
                    lg:px-16
                    lg:py-24
                "
            >
                <div>
                    <p
                        className="
                            text-xs
                            font-semibold
                            tracking-[0.25em]
                            text-red-500
                            sm:text-sm
                        "
                    >
                        NOW IN THEATERS
                    </p>

                    <h2
                        className="
                            mt-3
                            text-3xl
                            font-black
                            tracking-tight
                            text-white
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        Now Playing
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-2xl
                            text-sm
                            leading-6
                            text-zinc-400
                            sm:mt-4
                            sm:text-base
                        "
                    >
                        Experience movies currently running in theaters with
                        premium cinematic booking experience.
                    </p>
                </div>

                <div className="mt-8 sm:mt-10 lg:mt-14">
                    <MovieCard movies={movies1} />
                </div>
            </section>

            {/* ===================================================== */}
            {/* UPCOMING MOVIES */}
            {/* ===================================================== */}

            <section
                className="
                    relative
                    z-20
                    bg-zinc-950
                    px-4
                    pb-16
                    sm:px-8
                    sm:pb-20
                    lg:px-16
                    lg:pb-24
                "
            >
                <div>
                    <p
                        className="
                            text-xs
                            font-semibold
                            tracking-[0.25em]
                            text-red-500
                            sm:text-sm
                        "
                    >
                        COMING SOON
                    </p>

                    <h2
                        className="
                            mt-3
                            text-3xl
                            font-black
                            tracking-tight
                            text-white
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        Upcoming Movies
                    </h2>

                    <p
                        className="
                            mt-3
                            max-w-2xl
                            text-sm
                            leading-6
                            text-zinc-400
                            sm:mt-4
                            sm:text-base
                        "
                    >
                        Discover the next movies arriving in theaters and get
                        ready for your next cinematic experience.
                    </p>
                </div>

                <div className="mt-8 sm:mt-10 lg:mt-14">
                    <MovieCard movies={movies2} />
                </div>
            </section>

            {/* ===================================================== */}
            {/* FOOTER */}
            {/* ===================================================== */}

            <Footer />
        </main>
    );
}
