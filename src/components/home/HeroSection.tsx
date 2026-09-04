"use client";

import Link from "next/link";
import { useState } from "react";

type HeroMovie = {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
};

type HeroSectionProps = {
    movies: HeroMovie[];
};

export default function HeroSection({ movies }: HeroSectionProps) {
    /*
     * This component is loaded with SSR disabled.
     * Therefore this random selection only happens in the browser.
     */
    const [movie] = useState<HeroMovie | null>(() => {
        if (movies.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * movies.length);
        return movies[randomIndex];
    });

    if (!movie) {
        return null;
    }

    return (
        <section className="relative min-h-[125vh] overflow-hidden bg-black">
            {/* Background */}
            <div
                className="
                    absolute
                    inset-0
                    scale-105
                    bg-cover
                    bg-center
                    bg-no-repeat
                "
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/0" />

            {/* Left Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-black/70" />

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Top Gradient */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />

            {/* Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.8)]" />

            {/* Hero Content */}
            <div className="relative z-10 flex min-h-[125vh] items-center">
                <div className="w-full px-5 pt-16 sm:px-8 lg:px-16">
                    <div className="max-w-3xl">
                        {/* Featured Badge */}
                        <div
                            className="
                                mb-5
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/15
                                bg-white/5
                                px-4
                                py-2
                                text-xs
                                font-semibold
                                tracking-[0.2em]
                                text-zinc-200
                                backdrop-blur-xl
                                sm:mb-6
                            "
                        >
                            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                            FEATURED MOVIE
                        </div>

                        {/* Label */}
                        <p
                            className="
                                text-xs
                                font-bold
                                tracking-[0.35em]
                                text-red-500
                                sm:text-sm
                            "
                        >
                            NOW PLAYING IN THEATERS
                        </p>

                        {/* Title */}
                        <h1
                            className="
                                mt-4
                                max-w-4xl
                                text-4xl
                                font-black
                                leading-[0.95]
                                tracking-tight
                                text-white
                                drop-shadow-2xl
                                sm:mt-5
                                sm:text-6xl
                                lg:text-7xl
                                xl:text-8xl
                            "
                        >
                            {movie.title}
                        </h1>

                        {/* Metadata */}
                        <div
                            className="
                                mt-6
                                flex
                                flex-wrap
                                items-center
                                gap-3
                                text-sm
                                font-medium
                                text-zinc-300
                                sm:text-base
                            "
                        >
                            <span>{movie.release_date?.split("-")[0]}</span>

                            <span className="h-1 w-1 rounded-full bg-zinc-500" />

                            <span className="flex items-center gap-1 text-yellow-400">
                                <span>★</span>
                                {movie.vote_average.toFixed(1)}
                            </span>

                            <span className="h-1 w-1 rounded-full bg-zinc-500" />

                            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-300">
                                PG-13
                            </span>

                            <span className="h-1 w-1 rounded-full bg-zinc-500" />

                            <span>Now Showing</span>
                        </div>

                        {/* Description */}
                        <p
                            className="
                                mt-6
                                max-w-2xl
                                text-sm
                                leading-7
                                text-zinc-300
                                sm:text-base
                                sm:leading-8
                                lg:text-lg
                            "
                        >
                            {movie.overview.slice(0, 190)}...
                        </p>

                        {/* Buttons */}
                        <div
                            className="
                                mt-8
                                flex
                                flex-wrap
                                items-center
                                gap-3
                                sm:mt-9
                                sm:gap-4
                            "
                        >
                            <Link
                                href={`/movies/${movie.id}`}
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-red-600
                                    px-6
                                    py-3.5
                                    text-sm
                                    font-bold
                                    text-white
                                    shadow-[0_10px_40px_rgba(220,38,38,0.25)]
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:bg-red-500
                                    hover:shadow-[0_15px_50px_rgba(220,38,38,0.4)]
                                    sm:px-7
                                    sm:py-4
                                    sm:text-base
                                "
                            >
                                Book Tickets
                                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                href={`/movies/${movie.id}`}
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-white/15
                                    bg-white/5
                                    px-6
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    backdrop-blur-xl
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:border-white/30
                                    hover:bg-white/10
                                    sm:px-7
                                    sm:py-4
                                    sm:text-base
                                "
                            >
                                <span className="text-xs">▶</span>
                                Watch Trailer
                            </Link>
                        </div>

                        {/* Trust Information */}
                        <div
                            className="
                                mt-8
                                flex
                                flex-wrap
                                items-center
                                gap-x-5
                                gap-y-2
                                text-xs
                                text-zinc-400
                                sm:text-sm
                            "
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-red-500">●</span>
                                Book instantly
                            </span>

                            <span className="hidden h-1 w-1 rounded-full bg-zinc-600 sm:block" />

                            <span>Premium cinema experience</span>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div
                    className="
                        absolute
                        bottom-7
                        left-1/2
                        z-20
                        flex
                        -translate-x-1/2
                        flex-col
                        items-center
                        text-zinc-400
                        sm:bottom-10
                    "
                >
                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] sm:text-xs">
                        Scroll to Explore
                    </p>

                    <span className="mt-2 animate-bounce text-lg">↓</span>
                </div>

                {/* Featured Indicator */}
                <div
                    className="
                        absolute
                        bottom-7
                        right-5
                        z-20
                        hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        px-5
                        py-4
                        backdrop-blur-xl
                        lg:block
                    "
                >
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-500">
                        CINEVERSE FEATURED
                    </p>

                    <p className="mt-1 max-w-[180px] truncate text-sm font-semibold text-white">
                        {movie.title}
                    </p>
                </div>
            </div>
        </section>
    );
}
