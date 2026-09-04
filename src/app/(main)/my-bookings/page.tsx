"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Booking = {
    id: string;
    movieId: string;
    theater: string;
    time: string;
    seats: string;
    total: string;
    payment?: string | null;
    createdAt?: string;
};

type MovieInfo = {
    title: string;
};

type SessionUser = {
    userId: string;
    email: string;
    name: string;
};

export default function MyBookingsPage() {
    const [user, setUser] = useState<SessionUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);

    const [movieTitles, setMovieTitles] = useState<Record<string, string>>({});

    const [deletingBooking, setDeletingBooking] = useState<string | null>(null);

    // =====================================================
    // CHECK AUTHENTICATION
    // =====================================================

    useEffect(() => {
        async function checkAuthentication() {
            try {
                const response = await fetch("/api/auth/me");

                if (!response.ok) {
                    window.location.href = "/login";
                    return;
                }

                const data = await response.json();

                if (!data.authenticated || !data.user) {
                    window.location.href = "/login";
                    return;
                }

                setUser(data.user);
            } catch (error) {
                console.error("Authentication check failed:", error);
                window.location.href = "/login";
            } finally {
                setAuthLoading(false);
            }
        }

        checkAuthentication();
    }, []);

    // =====================================================
    // LOAD BOOKINGS FROM POSTGRESQL
    // =====================================================

    useEffect(() => {
        if (!user) {
            return;
        }

        async function loadBookings() {
            try {
                setBookingsLoading(true);

                const response = await fetch("/api/bookings");

                if (!response.ok) {
                    throw new Error("Failed to load bookings");
                }

                const data = await response.json();

                setBookings(data.bookings ?? []);
            } catch (error) {
                console.error("Failed to load bookings:", error);
                setBookings([]);
            } finally {
                setBookingsLoading(false);
            }
        }

        loadBookings();
    }, [user]);

    // =====================================================
    // LOAD MOVIE TITLES
    // =====================================================

    useEffect(() => {
        async function loadMovieTitles() {
            const movieIds = bookings
                .map((booking) => booking.movieId)
                .filter(Boolean);

            const uniqueMovieIds = [...new Set(movieIds)];

            if (uniqueMovieIds.length === 0) {
                setMovieTitles({});
                return;
            }

            const titleMap: Record<string, string> = {};

            await Promise.all(
                uniqueMovieIds.map(async (movieId) => {
                    try {
                        const response = await fetch(`/api/movies/${movieId}`);

                        if (!response.ok) {
                            return;
                        }

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
        }

        loadMovieTitles();
    }, [bookings]);

    // =====================================================
    // DELETE BOOKING FROM POSTGRESQL
    // =====================================================

    async function deleteBooking(id: string) {
        try {
            setDeletingBooking(id);

            const response = await fetch(`/api/bookings/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete booking");
            }

            setBookings((currentBookings) =>
                currentBookings.filter((booking) => booking.id !== id),
            );
        } catch (error) {
            console.error("Delete booking error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete booking",
            );
        } finally {
            setDeletingBooking(null);
        }
    }

    // =====================================================
    // GET MOVIE TITLE
    // =====================================================

    function getMovieTitle(movieId: string) {
        return movieTitles[movieId] || "Loading movie...";
    }

    // =====================================================
    // GET TICKET LINK
    // =====================================================

    function getTicketLink(booking: Booking) {
        const params = new URLSearchParams();

        params.set("movie", booking.movieId);
        params.set("theater", booking.theater);
        params.set("time", booking.time);
        params.set("seats", booking.seats);
        params.set("total", booking.total);
        params.set("bookingId", booking.id);

        if (booking.payment) {
            params.set("payment", booking.payment);
        }

        return `/booking-success?${params.toString()}`;
    }

    // =====================================================
    // AUTH LOADING SCREEN
    // =====================================================

    if (authLoading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500" />

                    <p className="mt-5 text-sm text-zinc-400">
                        Checking your account...
                    </p>
                </div>
            </main>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-12">
            <div className="mx-auto max-w-6xl">
                {/* Header */}

                <div className="mb-12">
                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500">
                        CINEVERSE
                    </p>

                    <h1 className="mt-3 text-5xl font-black">My Bookings</h1>

                    {user && (
                        <p className="mt-3 text-zinc-400">
                            Welcome back,{" "}
                            <span className="font-semibold text-white">
                                {user.name}
                            </span>
                            . Manage your movie tickets and bookings.
                        </p>
                    )}
                </div>

                {/* Booking Loading */}

                {bookingsLoading ? (
                    <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-12 text-center shadow-2xl">
                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500" />

                        <p className="mt-5 text-zinc-400">
                            Loading your bookings...
                        </p>
                    </div>
                ) : bookings.length === 0 ? (
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
                                            {getMovieTitle(booking.movieId)}
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
                                            disabled={
                                                deletingBooking === booking.id
                                            }
                                            className="mt-4 w-full rounded-2xl border border-red-600 py-4 font-semibold text-red-500 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {deletingBooking === booking.id
                                                ? "Deleting..."
                                                : "Delete Booking"}
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
