import Navbar from "../../../../components/layout/navbar";
import { movies } from "../../../../constants/movies";

export default async function MovieDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const movie = movies[id as keyof typeof movies];

    if (!movie) {
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
                        backgroundImage: `url(${movie.backdrop})`,
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
                                    <span>{movie.year}</span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span>{movie.genres}</span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span className="text-yellow-400">
                                        ⭐ {movie.rating}
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-zinc-500" />

                                    <span>{movie.duration}</span>
                                </div>

                                {/* Description */}
                                <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg lg:text-xl">
                                    {movie.description}
                                </p>

                                {/* Buttons */}
                                <div className="mt-10 flex flex-wrap gap-4">
                                    <button className="cursor-pointer rounded-xl bg-orange-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-700">
                                        Book Tickets
                                    </button>

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

            <section className="relative z-20 bg-zinc-950 px-6 py-6 sm:px-10 lg:px-16">
                <div className="grid grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:grid-cols-4">
                    <div>
                        <p className="text-sm text-zinc-500">Release Date</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {movie.releaseDate}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">Director</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {movie.director}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">Writers</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {movie.writers}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-500">Box Office</p>

                        <h3 className="mt-2 text-lg font-semibold text-white">
                            {movie.boxOffice}
                        </h3>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-950 px-6 py-12 sm:px-10 lg:px-16">
                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Trailer */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-white">
                            Trailer
                        </h2>

                        <div className="relative h-64 overflow-hidden rounded-3xl">
                            {/* Thumbnail */}
                            <img
                                src="https://images.thedirect.com/media/article_full/the-flash-movie-trailer-release-date.jpg"
                                alt="Trailer"
                                className="h-full w-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/35" />

                            {/* Play Button */}
                            <button className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl text-white backdrop-blur-md transition hover:scale-110">
                                ▶
                            </button>

                            {/* Bottom Text */}
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="font-semibold">
                                    Official Trailer
                                </p>
                            </div>

                            {/* Duration */}
                            <div className="absolute bottom-4 right-4 text-sm text-zinc-300">
                                2:24
                            </div>
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
                            {movie.cast.map((actor) => (
                                <div
                                    key={actor.name}
                                    className="overflow-hidden rounded-3xl bg-zinc-900 transition hover:scale-105"
                                >
                                    <img
                                        src={actor.image}
                                        alt={actor.name}
                                        className="h-40 w-full object-cover"
                                    />

                                    <div className="p-3">
                                        <h3 className="font-semibold text-white">
                                            {actor.name}
                                        </h3>

                                        <p className="text-sm text-zinc-400">
                                            {actor.character}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-zinc-950 px-6 py-16 sm:px-10 lg:px-16">
                <h2 className="mb-8 text-3xl font-bold text-white">
                    Available In Theaters
                </h2>

                <div className="grid gap-6 lg:grid-cols-3">
                    {movie.theaters.map((theater) => (
                        <div
                            key={theater.name}
                            className="rounded-3xl bg-zinc-900 p-6"
                        >
                            <h3 className="text-xl font-bold text-white">
                                {theater.name}
                            </h3>

                            <p className="mt-1 text-zinc-400">
                                {theater.location}
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {theater.timings.map((time) => (
                                    <button
                                        key={time}
                                        className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-white transition hover:border-red-500 hover:bg-red-600"
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
