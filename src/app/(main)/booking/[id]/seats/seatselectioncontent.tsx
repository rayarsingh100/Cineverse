"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function SeatPage() {

    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const id = params.id as string;
    const theater = searchParams.get("theater");
    const time = searchParams.get("time");

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const bookedSeats = ["A4", "B3", "C6", "F9", "J15"];

    const seatCategories = [
        {
            name: "Premium",
            color: "border-red-500 text-red-500",
            price: 500,
            rows: ["A", "B"],
            seats: 8,
        },
        {
            name: "Recliner",
            color: "border-yellow-500 text-yellow-500",
            price: 350,
            rows: ["C", "D"],
            seats: 12,
        },
        {
            name: "Executive",
            color: "border-green-500 text-green-500",
            price: 250,
            rows: ["E", "F", "G", "H"],
            seats: 16,
        },
        {
            name: "Classic",
            color: "border-blue-500 text-blue-500",
            price: 180,
            rows: ["I", "J", "K", "L"],
            seats: 20,
        },
    ];

    const getSeatPrice = (seatId: string) => {
        const row = seatId[0];

        if (["A", "B"].includes(row)) return 500;
        if (["C", "D"].includes(row)) return 350;
        if (["E", "F", "G", "H"].includes(row)) return 250;

        return 180;
    };

    const totalPrice = selectedSeats.reduce(
        (total, seat) => total + getSeatPrice(seat),
        0,
    );

    return (
        <main className="min-h-screen bg-black px-8 py-10 text-white lg:px-16">
            {/* Top Section */}
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="flex gap-6 rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-md">
                    <img
                        src="https://rukminim2.flixcart.com/image/480/640/jr3t5e80/poster/7/g/a/medium-the-flash-tv-show-poster-for-room-office-13-inch-x-19-original-imafcz3fpjgwu8tj.jpeg?q=90"
                        alt="Movie"
                        className="h-48 w-32 rounded-2xl object-cover"
                    />

                    <div className="flex flex-col justify-center space-y-4">
                        <h1 className="text-4xl font-bold capitalize">
                            {id.replace("-", " ")}
                        </h1>

                        <p className="text-zinc-400">📍 {theater}</p>

                        <p className="text-zinc-400">🕒 {time}</p>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-md">
                    <h2 className="mb-8 text-2xl font-bold">Your Booking</h2>

                    <div className="space-y-5">
                        <div className="flex justify-between text-zinc-400">
                            <span>Seats</span>

                            <span className="text-white">
                                {selectedSeats.length}
                            </span>
                        </div>

                        <div className="flex justify-between text-zinc-400">
                            <span>Total</span>

                            <span className="text-3xl font-bold text-red-500">
                                ₹{totalPrice}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-md">
                <div className="flex flex-wrap justify-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-green-500" />
                        <span>Available</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-zinc-500" />
                        <span>Booked</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded bg-yellow-500" />
                        <span>Selected</span>
                    </div>
                </div>
            </div>

            {/* Screen */}
            <div className="mt-20 flex justify-center">
                <div className="w-4/5 rounded-t-[100%] border-t-8 border-zinc-300 py-10 text-center text-xl tracking-[0.5em] text-zinc-300 shadow-[0_0_80px_rgba(255,255,255,0.15)]">
                    SCREEN
                </div>
            </div>

            {/* Seats */}
            <div className="mt-20 space-y-20">
                {seatCategories.map((category) => (
                    <div key={category.name}>
                        <h2
                            className={`mb-10 text-center text-3xl font-bold ${
                                category.color.split(" ")[1]
                            }`}
                        >
                            {category.name}
                        </h2>

                        <div className="space-y-4">
                            {category.rows.map((row) => (
                                <div
                                    key={row}
                                    className="flex justify-center gap-3"
                                >
                                    <span className="mr-8 w-6 text-zinc-500">
                                        {row}
                                    </span>

                                    {Array.from({
                                        length: category.seats,
                                    }).map((_, index) => {
                                        const seatId = `${row}${index + 1}`;

                                        const isBooked =
                                            bookedSeats.includes(seatId);

                                        const isSelected =
                                            selectedSeats.includes(seatId);

                                        return (
                                            <button
                                                key={seatId}
                                                disabled={isBooked}
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setSelectedSeats(
                                                            selectedSeats.filter(
                                                                (seat) =>
                                                                    seat !==
                                                                    seatId,
                                                            ),
                                                        );
                                                    } else {
                                                        setSelectedSeats([
                                                            ...selectedSeats,
                                                            seatId,
                                                        ]);
                                                    }
                                                }}
                                                className={`
                                                flex h-10 w-10 items-center justify-center rounded-lg border text-sm transition-all duration-300 hover:scale-110
                                                ${
                                                    isBooked
                                                        ? "cursor-not-allowed border-zinc-700 bg-zinc-700 text-zinc-400"
                                                        : isSelected
                                                          ? "border-yellow-500 bg-yellow-500 text-black"
                                                          : category.color
                                                }
                                            `}
                                            >
                                                {index + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Summary */}
            <div className="mt-20 rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-md">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {selectedSeats.length} Seats Selected
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            {selectedSeats.length === 0
                                ? "Select your favorite seats"
                                : selectedSeats.join(", ")}
                        </p>
                    </div>

                    <div>
                        <p className="text-zinc-400">Total Payable</p>

                        <h2 className="text-4xl font-bold text-red-500">
                            ₹{selectedSeats.length * 250}
                        </h2>
                    </div>

                    <button
                        disabled={selectedSeats.length === 0}
                        onClick={() =>
                            router.push(
                                `/checkout?movie=${id}&theater=${theater}&time=${time}&seats=${selectedSeats.join(
                                    ",",
                                )}&total=${totalPrice}`,
                            )
                        }
                        className="rounded-2xl bg-red-600 px-10 py-4 text-lg font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-700"
                    >
                        Proceed To Pay →
                    </button>
                </div>
            </div>
        </main>
    );
}
