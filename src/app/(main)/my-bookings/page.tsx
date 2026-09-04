"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Booking = {
    id: string;
    movie: string | null;
    theater: string | null;
    time: string | null;
    seats: string | null;
    total: string | null;
    payment?: string | null;
};

type MovieInfo = {
    title: string;
};

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>(() => {
        if (typeof window === "undefined") {
            return [];
        }

        try {
            return JSON.parse(localStorage.getItem("bookings") || "[]");
        } catch {
            return [];
        }
    });

    const [movieTitles, setMovieTitles] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadMovieTitles = async () => {
            const movieIds = bookings
                .map((booking) => booking.movie)
                .filter((movieId): movieId is string => Boolean(movieId));

            const uniqueMovieIds = [...new Set(movieIds)];

            const titleMap: Record<string, string> = {};

            await Promise.all(
                uniqueMovieIds.map(async (movieId) => {
                    try {
                        const response = await fetch(`/api/movies/${movieId}`);

                        if (!response.ok) return;

                        const movie: MovieInfo = await response.json();

                        titleMap[movieId] = movie.title;
                    } catch (error) {
                        console.error(
                            `Failed to load movie ${movieId}:`,
                            error,
                        );
                    }
                }),
            );

            setMovieTitles(titleMap);
        };

        if (bookings.length > 0) {
            loadMovieTitles();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteBooking = (id: string) => {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);

        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        setBookings(updatedBookings);
    };

    const getMovieTitle = (movieId: string | null) => {
        if (!movieId) {
            return "Unknown Movie";
        }

        return movieTitles[movieId] || "Loading movie...";
    };

    const getTicketLink = (booking: Booking) => {
        const params = new URLSearchParams();

        params.set("movie", booking.movie || "");
        params.set("theater", booking.theater || "");
        params.set("time", booking.time || "");
        params.set("seats", booking.seats || "");
        params.set("total", booking.total || "");
        params.set("bookingId", booking.id);

        if (booking.payment) {
            params.set("payment", booking.payment);
        }

        return `/booking-success?${params.toString()}`;
    };

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-12">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500">
                        CINEVERSE
                    </p>

                    <h1 className="mt-3 text-5xl font-black">My Bookings</h1>

                    <p className="mt-3 text-zinc-400">
                        Manage your movie tickets and bookings.
                    </p>
                </div>

                {bookings.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-12 text-center shadow-2xl">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl">
                            🎬
                        </div>

                        <h2 className="mt-6 text-3xl font-bold">
                            No Bookings Yet
                        </h2>

                        <p className="mt-4 text-zinc-400">
                            Book your first movie and it will appear here.
                        </p>

                        <Link
                            href="/"
                            className="mt-8 inline-block rounded-2xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700"
                        >
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    /* Booking List */
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900 p-6 shadow-2xl transition hover:border-red-500/30 md:p-8"
                            >
                                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                                    {/* Booking Information */}
                                    <div className="min-w-0">
                                        <h2 className="text-3xl font-bold">
                                            {getMovieTitle(booking.movie)}
                                        </h2>

                                        <div className="mt-5 space-y-3">
                                            <p className="text-zinc-400">
                                                📍 {booking.theater || "N/A"}
                                            </p>

                                            <p className="text-zinc-400">
                                                🕒 {booking.time || "N/A"}
                                            </p>

                                            <p className="text-zinc-400">
                                                🎟 Seats:{" "}
                                                {booking.seats || "N/A"}
                                            </p>

                                            {booking.payment && (
                                                <p className="text-zinc-400">
                                                    💳 Payment:{" "}
                                                    {booking.payment}
                                                </p>
                                            )}
                                        </div>

                                        <p className="mt-5 text-2xl font-bold text-green-500">
                                            ₹{booking.total || "0"}
                                        </p>
                                    </div>

                                    {/* Booking Actions */}
                                    <div className="w-full lg:w-80">
                                        {/* Booking ID */}
                                        <div className="mb-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                                            <p className="text-sm text-zinc-500">
                                                Booking ID
                                            </p>

                                            <p className="mt-1 break-all font-mono text-lg font-bold text-white">
                                                {booking.id}
                                            </p>
                                        </div>

                                        {/* View Ticket */}
                                        <Link
                                            href={getTicketLink(booking)}
                                            className="block w-full rounded-2xl bg-red-600 px-6 py-4 text-center font-semibold transition hover:bg-red-700"
                                        >
                                            View Ticket
                                        </Link>

                                        {/* Delete */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteBooking(booking.id)
                                            }
                                            className="mt-4 w-full rounded-2xl border border-red-600 py-4 font-semibold text-red-500 transition hover:bg-red-600 hover:text-white"
                                        >
                                            Delete Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
