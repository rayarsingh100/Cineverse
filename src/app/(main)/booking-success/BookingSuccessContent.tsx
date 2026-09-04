"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type Booking = {
    id: string;
    movie: string | null;
    theater: string | null;
    time: string | null;
    seats: string | null;
    total: string | null;
    payment: string | null;
};

export default function BookingSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const movie = searchParams.get("movie");
    const theater = searchParams.get("theater");
    const time = searchParams.get("time");
    const seats = searchParams.get("seats");
    const total = searchParams.get("total");
    const payment = searchParams.get("payment") || "UPI";

    const bookingIdFromUrl = searchParams.get("bookingId");

    const [bookingId] = useState(
        () =>
            bookingIdFromUrl ||
            `CV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    );

    const downloadTicket = async () => {
        const ticket = document.getElementById("ticket");

        if (!ticket) return;

        try {
            const dataUrl = await toPng(ticket);

            const pdf = new jsPDF("p", "mm", "a4");

            const imgProps = pdf.getImageProperties(dataUrl);

            const pdfWidth = pdf.internal.pageSize.getWidth();

            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

            pdf.save(`${movie ?? "cineverse"}-ticket.pdf`);
        } catch (error) {
            console.error("Failed to download ticket:", error);
        }
    };

    useEffect(() => {
        const newBooking: Booking = {
            id: bookingId,
            movie,
            theater,
            time,
            seats,
            total,
            payment,
        };

        const existingBookings: Booking[] = JSON.parse(
            localStorage.getItem("bookings") || "[]",
        );

        const alreadyExists = existingBookings.some(
            (booking) => booking.id === bookingId,
        );

        if (!alreadyExists) {
            existingBookings.unshift(newBooking);

            localStorage.setItem("bookings", JSON.stringify(existingBookings));
        }
    }, [bookingId, movie, theater, time, seats, total, payment]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
            <div
                id="ticket"
                className="relative w-full max-w-2xl overflow-hidden rounded-[40px] bg-zinc-900 shadow-[0_30px_100px_rgba(0,0,0,0.6)]"
            >
                {/* Ticket Cutouts */}
                <div className="absolute left-0 top-[70%] h-12 w-12 -translate-x-1/2 rounded-full bg-black" />

                <div className="absolute right-0 top-[70%] h-12 w-12 translate-x-1/2 rounded-full bg-black" />

                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 p-8 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-5xl">
                            ✓
                        </div>
                    </div>

                    <h1 className="text-4xl font-black">CINEVERSE</h1>

                    <p className="mt-2 text-red-100">
                        Your movie ticket is ready 🎉
                    </p>
                </div>

                {/* Body */}
                <div className="space-y-8 p-10">
                    {/* Movie */}
                    <div>
                        <p className="text-zinc-500">Movie</p>

                        <h2 className="text-3xl font-bold">
                            {movie || "Movie"}
                        </h2>
                    </div>

                    {/* Booking Information */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-zinc-500">Theater</p>

                            <h3 className="text-xl">{theater || "N/A"}</h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Show Time</p>

                            <h3 className="text-xl">{time || "N/A"}</h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Seats</p>

                            <h3 className="text-xl">{seats || "N/A"}</h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Payment</p>

                            <h3 className="text-xl">{payment}</h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Total Paid</p>

                            <h3 className="text-xl font-bold text-green-500">
                                ₹{total || "0"}
                            </h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Status</p>

                            <h3 className="text-xl font-bold text-green-500">
                                ✓ Confirmed
                            </h3>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="border-t border-dashed border-zinc-700 pt-8">
                        <div className="flex justify-center">
                            <div className="rounded-2xl bg-white p-4">
                                <QRCode
                                    value={`CINEVERSE
Movie: ${movie}
Theater: ${theater}
Time: ${time}
Seats: ${seats}
Total: ₹${total}
Payment: ${payment}
Booking ID: ${bookingId}`}
                                    size={150}
                                />
                            </div>
                        </div>

                        {/* Booking ID */}
                        <p className="mt-6 text-center text-zinc-500">
                            Booking ID
                        </p>

                        <p className="text-center text-lg font-bold">
                            {bookingId}
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <button
                                type="button"
                                onClick={downloadTicket}
                                className="flex-1 rounded-2xl bg-red-600 py-4 font-semibold transition hover:bg-red-700"
                            >
                                Download Ticket
                            </button>

                            <button
                                type="button"
                                onClick={() => router.push("/my-bookings")}
                                className="flex-1 rounded-2xl border border-zinc-700 py-4 font-semibold transition hover:bg-zinc-800"
                            >
                                My Bookings
                            </button>
                        </div>

                        {/* Home */}
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="mt-4 w-full rounded-2xl border border-zinc-800 py-4 font-semibold text-zinc-300 transition hover:bg-zinc-800"
                        >
                            Back To Home
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
