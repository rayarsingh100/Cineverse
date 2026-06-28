/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const movies = [
    {
        id: "kingdom-of-the-planet-of-the-apes",
        name: "Kingdom of the Planet of the Apes",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL7u0NNIyS1DH1Vaq-0u0Qd1_dm6nsji7q-Q&s",
        genres: "Action, Adventure, Sci-Fi",
        duration: "2h 15m",
        rating: "4.2",
    },

    {
        id: "spiderman",
        name: "Spiderman",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrkKUBz0M_XKLBj3SujMXBhjBYcAdvNqqvg&s",
        genres: "Action, Comedy, Thriller",
        duration: "2h 15m",
        rating: "4.2",
    },

    {
        id: "the-flash",
        name: "The Flash",
        poster: "https://rukminim2.flixcart.com/image/480/640/jr3t5e80/poster/7/g/a/medium-the-flash-tv-show-poster-for-room-office-13-inch-x-19-original-imafcz3fpjgwu8tj.jpeg?q=90",
        genres: "Action, Adventure, Sci-Fi",
        duration: "2h 15m",
        rating: "4.2",
    },

    {
        id: "game-of-thrones",
        name: "Game of Thrones",
        poster: "https://c8.alamy.com/comp/RFRKR0/original-film-title-game-of-thrones-english-title-game-of-thrones-year-2011-director-daniel-minahan-credit-hbo-album-RFRKR0.jpg",
        genres: "Action, War, History",
        duration: "2h 15m",
        rating: "4.2",
    },

    {
        id: "squid-game",
        name: "Squid Game",
        poster: "https://rukminim2.flixcart.com/image/480/480/xif0q/poster/h/d/k/medium-squid-game-hd-poster-for-wall-decor-a3-poster-squid-game-original-imagv2vxrqtudpet.jpeg?q=90",
        genres: "Thriller, Action, Drama",
        duration: "2h 15m",
        rating: "4.2",
    },
];

export default function MovieCard() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-6">
            {movies.map((movie) => (
                <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="relative h-105 w-60 cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 hover:scale-110"
                >
                    {/* Poster */}
                    <div className="h-full w-full">
                        <img
                            src={movie.poster}
                            alt={movie.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 z-10 h-3/4 bg-gradient-to-t from-black via-black/88 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 z-20 flex h-1/3 w-full flex-col justify-between gap-2 border border-white/1 bg-black/10 backdrop-blur-sm lg:p-6 sm:p-8">
                        <h2 className="text-md font-bold text-white">
                            {movie.name}
                        </h2>

                        <h1 className="text-gray-400">{movie.genres}</h1>

                        <div className="w-full">
                            <h1 className="pb-4 text-white">
                                ⭐ {movie.rating} | {movie.duration} | PG-13
                            </h1>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
