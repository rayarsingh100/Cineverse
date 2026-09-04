import Link from "next/link";
import Navbar from "../../../../components/layout/navbar";
import { getMovieDetails } from "../../../../lib/tmdb";
import { theaters } from "../../../../constants/movies";

export default async function BookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const movie = await getMovieDetails(id);

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <Navbar />

            <section className="px-6 pb-20 pt-32 sm:px-10 lg:px-16">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500">
                        BOOK YOUR TICKETS
                    </p>

                    <h1 className="mt-4 text-4xl font-black sm:text-5xl">
                        {movie.title}
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        Select a theater and showtime
                    </p>
                </div>

                {/* Theaters */}
                <div className="grid gap-6 lg:grid-cols-2">
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
                                hover:-translate-y-1
                                hover:border-red-500/30
                            "
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-red-500/5" />

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold">
                                    {theater.name}
                                </h2>

                                <p className="mt-2 text-zinc-400">
                                    📍 {theater.location}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    {theater.timings.map((time) => (
                                        <Link
                                            key={time}
                                            href={`/booking/${id}/seats?theater=${encodeURIComponent(
                                                theater.name,
                                            )}&time=${encodeURIComponent(time)}`}
                                            className="
                                                rounded-xl
                                                border border-white/10
                                                bg-white/10
                                                px-4 py-3
                                                font-semibold
                                                text-white
                                                transition-all duration-300
                                                hover:border-red-500
                                                hover:bg-red-600
                                                hover:scale-105
                                            "
                                        >
                                            {time}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
