import Navbar from "../../../../components/layout/navbar";
import {
    getMovieDetails,
    getMovieCredits,
    getMovieVideos,
} from "../../../../lib/tmdb";
import Link from "next/link";
import type {
    CastMember,
    Credits,
    VideosResponse,
} from "../../../../types/tmdb";
import { theaters } from "../../../../constants/movies";

export default async function MovieDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
   const { id } = await params;

   const movie = await getMovieDetails(id);

   const staticMovie =
       movie[
           movie.title
               .toLowerCase()
               .replace(/:/g, "")
               .replace(/\s+/g, "-") as keyof typeof movie
       ];

   const credits: Credits = await getMovieCredits(id);

   const videos: VideosResponse = await getMovieVideos(id);
       console.log(movie.title);
       console.log(movie.id);
       console.log(videos.results);
   const cast: CastMember[] = credits.cast.slice(0, 4);

   const director =
       credits.crew?.find((person) => person.job === "Director")?.name || "N/A";

   const writers =
       credits.crew
           ?.filter(
               (person) =>
                   person.job === "Writer" || person.job === "Screenplay",
           )
           .map((person) => person.name)
           .join(", ") || "N/A";

   const trailer = videos.results.find(
       (video) => video.type === "Trailer" && video.site === "YouTube",
   );

   if (!movie?.id) {
       return (
           <main className="flex min-h-screen items-center justify-center bg-black text-white">
               <h1 className="text-4xl font-bold">Movie Not Found</h1>
           </main>
       );
   }

    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950">
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Hero Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
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
                        <div className="max-w-3xl">
                            {/* Glass Wrapper */}
                            <div className="rounded-3xl border border-white/1 bg-black/20 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
                                {/* Small Text */}
                                <p className="text-sm font-semibold tracking-[0.3em] text-red-500 sm:text-base">
                                    NOW SHOWING
                                </p>

                                {/* Movie Title */}
                                <h1 className="mt-5 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-8xl">
                                    {movie.title}
                                </h1>

                                {/* Metadata */}
                                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-300">
                                    <span>
                                        {movie.release_date?.split("-")[0]}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span>
                                        {movie.genres
                                            .map(
                                                (g: { name: string }) => g.name,
                                            )
                                            .join(", ")}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span className="text-yellow-400">
                                        ⭐ {movie.vote_average.toFixed(1)}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span>{movie.runtime} min</span>
                                </div>

                                {/* Description */}
                                <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
                                    {movie.overview}
                                </p>

                                {/* Buttons */}
                                <div className="mt-10 flex flex-wrap gap-4">
                                    {/* Scroll to Theater Section */}
                                    <a
                                        href="#theater-section"
                                        className="cursor-pointer rounded-xl bg-orange-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-700"
                                    >
                                        Book Tickets
                                    </a>

                                    {/* Scroll to Trailer Section */}
                                    <a
                                        href="#trailer-section"
                                        className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                                    >
                                        Watch Trailer
                                    </a>
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

            <section className="relative z-20 bg-zinc-950 px-6 py-6 sm:px-10 lg:px-16">
                <div className="grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:grid-cols-4">
                    <div>
                        <p className="text-sm text-zinc-500">Release Date</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {new Date(movie.release_date).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">Director</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {director}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">Writers</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {writers}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">Box Office</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {movie.revenue && movie.revenue > 0
                                ? `$${movie.revenue.toLocaleString()}`
                                : "N/A"}
                        </h3>
                    </div>
                </div>
            </section>

            <section
                className="bg-zinc-950 px-6 py-12 sm:px-10 lg:px-16"
                id="trailer-section"
            >
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Trailer */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-white">
                            Trailer
                        </h2>

                        <div className="overflow-hidden rounded-3xl">
                            {trailer ? (
                                <iframe
                                    className="h-64 w-full rounded-3xl"
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title="Movie Trailer"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="flex h-64 flex-col items-center justify-center rounded-3xl bg-zinc-900 text-zinc-400">
                                    <p>Trailer Coming Soon 🎬</p>

                                    <a
                                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                                            `${movie.title} official trailer`,
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 rounded-xl bg-red-600 px-5 py-3 text-white"
                                    >
                                        Search on YouTube
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* About Movie */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-white">
                            About Movie
                        </h2>

                        <div className="min-h-64 rounded-3xl bg-zinc-900 p-6">
                            {/* Description */}
                            <p className="text-zinc-300 leading-relaxed">
                                {movie.description}
                            </p>

                            {/* Movie Details */}
                            <div className="mt-12 space-y-4">
                                <div className="flex items-center gap-6">
                                    <span className="w-24 text-sm text-zinc-500">
                                        Language
                                    </span>

                                    <span className="text-zinc-500">:</span>

                                    <span className="text-white">
                                        {movie.language}
                                    </span>
                                </div>

                                <div className="flex items-center gap-6">
                                    <span className="w-24 text-sm text-zinc-500">
                                        Country
                                    </span>

                                    <span className="text-zinc-500">:</span>

                                    <span className="text-white">
                                        {movie.country}
                                    </span>
                                </div>

                                <div className="flex items-center gap-6">
                                    <span className="w-24 text-sm text-zinc-500">
                                        Budget
                                    </span>

                                    <span className="text-zinc-500">:</span>

                                    <span className="text-white">
                                        {movie.budget}
                                    </span>
                                </div>

                                <div className="flex items-center gap-6">
                                    <span className="w-24 text-sm text-zinc-500">
                                        Revenue
                                    </span>

                                    <span className="text-zinc-500">:</span>

                                    <span className="text-white">
                                        {movie.revenue}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cast */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-white">
                            Cast
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            {cast.slice(0, 4).map((actor) => (
                                <div
                                    key={actor.id}
                                    className="h-[325px] w-[250px] overflow-hidden rounded-3xl bg-zinc-900 transition duration-300 hover:scale-105"
                                >
                                    <div className="aspect-square overflow-hidden rounded-3xl bg-zinc-900">
                                        <img
                                            src={
                                                actor.profile_path
                                                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                                    : "/placeholder-person.jpg"
                                            }
                                            alt={actor.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="p-4">
                                        <h3 className="truncate text-xl font-semibold text-white">
                                            {actor.name}
                                        </h3>

                                        <p className="truncate text-lg text-zinc-400">
                                            {actor.character}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="bg-zinc-950 px-6 py-16 sm:px-10 lg:px-16"
                id="theater-section"
            >
                <h2 className="mb-8 text-3xl font-bold text-white">
                    Available In Theaters
                </h2>

                <div className="grid gap-6 lg:grid-cols-3">
                    {theaters.map((theater) => (
                        <div
                            key={theater.name}
                            className="
                relative overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/5
                p-8
                backdrop-blur-2xl
                transition-all duration-300
                hover:-translate-y-2
                hover:border-red-500/30
                hover:shadow-[0_20px_60px_rgba(239,68,68,0.2)]
            "
                        >
                            {/* Glass Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-red-500/5" />

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-white">
                                    {theater.name}
                                </h3>

                                <p className="mt-2 text-lg text-zinc-300">
                                    📍 {theater.location}
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    {theater.timings.map((time) => (
                                        <Link
                                            key={time}
                                            href={`/booking/${id}/seats?theater=${encodeURIComponent(
                                                theater.name,
                                            )}&time=${encodeURIComponent(time)}`}
                                            className="
                                rounded-2xl
                                border border-white/10
                                bg-white/10
                                px-5 py-3
                                text-lg font-semibold text-white
                                backdrop-blur-md
                                transition-all duration-300
                                hover:scale-105
                                hover:border-red-500
                                hover:bg-red-600
                                hover:shadow-lg
                            "
                                        >
                                            {time}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>~
            </section>
        </main>
    );
}
