"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
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
};

export default function BookingSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const movie = searchParams.get("movie");
    const theater = searchParams.get("theater");
    const time = searchParams.get("time");
    const seats = searchParams.get("seats");
    const total = searchParams.get("total");

    /* eslint-disable-next-line react-hooks/purity */
    const bookingId = searchParams.get("bookingId") || `CV-${Date.now()}`;

    const downloadTicket = async () => {
        const ticket = document.getElementById("ticket");

        if (!ticket) return;

        const dataUrl = await toPng(ticket);

        const pdf = new jsPDF("p", "mm", "a4");

        const imgProps = pdf.getImageProperties(dataUrl);

        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

        pdf.save(`${movie ?? "ticket"}-ticket.pdf`);
    };

    useEffect(() => {
        const newBooking = {
            id: bookingId,
            movie,
            theater,
            time,
            seats,
            total,
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
    }, [bookingId, movie, theater, time, seats, total]);

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
                    <div>
                        <p className="text-zinc-500">Movie</p>

                        <h2 className="text-3xl font-bold capitalize">
                            {movie}
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-zinc-500">Theater</p>

                            <h3 className="text-xl">{theater}</h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Show Time</p>

                            <h3 className="text-xl">{time}</h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Seats</p>

                            <h3 className="text-xl">{seats}</h3>
                        </div>

                        <div>
                            <p className="text-zinc-500">Total Paid</p>

                            <h3 className="text-xl font-bold text-green-500">
                                ₹{total}
                            </h3>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-zinc-700 pt-8">
                        <div className="flex justify-center">
                            <div className="rounded-2xl bg-white p-4">
                                <QRCode
                                    value={`
                                    Movie:${movie}
                                    Theater:${theater}
                                    Time:${time}
                                    Seats:${seats}
                                    Total:${total}
                                    BookingId:${bookingId}
                                `}
                                    size={150}
                                />
                            </div>
                        </div>

                        <p className="mt-6 text-center text-zinc-500">
                            Booking ID: {bookingId || "Generating..."}
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <button
                                onClick={downloadTicket}
                                className="flex-1 rounded-2xl bg-red-600 py-4 font-semibold transition hover:bg-red-700"
                            >
                                Download Ticket
                            </button>

                            <button
                                onClick={() => router.push("/")}
                                className="flex-1 rounded-2xl border border-zinc-700 py-4 font-semibold transition hover:bg-zinc-800"
                            >
                                Back To Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
