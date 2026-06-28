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
};

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const savedBookings: Booking[] = JSON.parse(
            localStorage.getItem("bookings") || "[]",
        );

        setBookings(savedBookings);
    }, []);

    const deleteBooking = (id: string) => {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);

        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        setBookings(updatedBookings);
    };

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-12">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-12 text-5xl font-bold">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-12 text-center">
                        <h2 className="text-3xl font-bold">No Bookings Yet</h2>

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
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                                className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl"
                            >
                                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                                    {/* Left */}
                                    <div>
                                        <h2 className="text-3xl font-bold">
                                            {booking.movie}
                                        </h2>

                                        <p className="mt-4 text-zinc-400">
                                            📍 {booking.theater}
                                        </p>

                                        <p className="mt-2 text-zinc-400">
                                            🕒 {booking.time}
                                        </p>

                                        <p className="mt-2 text-zinc-400">
                                            🎟 Seats: {booking.seats}
                                        </p>

                                        <p className="mt-4 text-2xl font-bold text-green-500">
                                            ₹{booking.total}
                                        </p>
                                    </div>

                                    {/* Right */}
                                    <div className="space-y-4 text-center">
                                        <p className="text-zinc-500">
                                            Booking ID
                                        </p>

                                        <h3 className="font-semibold">
                                            {booking.id}
                                        </h3>

                                        <Link
                                            href={`/booking-success?movie=${booking.movie}&theater=${booking.theater}&time=${booking.time}&seats=${booking.seats}&total=${booking.total}&bookingId=${booking.id}`}
                                            className="block w-full rounded-2xl bg-red-600 px-6 py-3 text-center font-semibold transition hover:bg-red-700"
                                        >
                                            View Ticket
                                        </Link>
                                    </div>
                                    <Link
                                        href={`/booking-success?...`}
                                        className="block w-full rounded-2xl bg-red-600 px-6 py-3 text-center font-semibold transition hover:bg-red-700"
                                    >
                                        View Ticket
                                    </Link>

                                    <button
                                        onClick={() =>
                                            deleteBooking(booking.id)
                                        }
                                        className="w-full rounded-2xl border border-red-600 py-3 font-semibold text-red-500 transition hover:bg-red-600 hover:text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
