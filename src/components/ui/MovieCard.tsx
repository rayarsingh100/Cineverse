/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import type { Movie } from "../../types/tmdb";

export default function MovieCard({ movies }: { movies: Movie[] }) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
                <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="relative h-[490px] w-[320px] cursor-pointer overflow-hidden rounded-3xl bg-zinc-900 transition-all duration-300 hover:scale-105"
                >
                    {/* Poster */}
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="h-full w-full object-cover"
                    />

                    {/* Dark Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/90 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 w-full p-6">
                        <h2 className="text-2xl font-bold text-white line-clamp-2">
                            {movie.title}
                        </h2>

                        <p className="mt-3 text-sm text-zinc-400">
                            Release: {movie.release_date}
                        </p>

                        <p className="mt-4 text-lg text-white">
                            ⭐ {movie.vote_average.toFixed(1)} | PG-13
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
