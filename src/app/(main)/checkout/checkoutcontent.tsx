"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Movie = {
    title: string;
    poster_path: string;
};

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const movieId = searchParams.get("movie");
    const theater = searchParams.get("theater");
    const time = searchParams.get("time");
    const seats = searchParams.get("seats");
    const total = Number(searchParams.get("total"));

    const [movie, setMovie] = useState<Movie | null>(null);
    const [selectedPayment, setSelectedPayment] = useState("UPI");
    const [isProcessing, setIsProcessing] = useState(false);

    const convenienceFee = 99;
    const grandTotal = total + convenienceFee;

    useEffect(() => {
        async function fetchMovie() {
            if (!movieId) return;

            try {
                const response = await fetch(`/api/movies/${movieId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch movie");
                }

                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("Failed to load movie:", error);
            }
        }

        fetchMovie();
    }, [movieId]);

    const handlePayment = async () => {
        if (isProcessing) return;

        setIsProcessing(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        router.push(
            `/booking-success?movie=${movieId}&theater=${encodeURIComponent(
                theater || "",
            )}&time=${encodeURIComponent(
                time || "",
            )}&seats=${encodeURIComponent(
                seats || "",
            )}&total=${grandTotal}&payment=${encodeURIComponent(
                selectedPayment,
            )}`,
        );
    };

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm font-semibold tracking-[0.3em] text-red-500">
                        SECURE CHECKOUT
                    </p>

                    <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                        Complete Your Booking
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        Review your booking details and complete the payment.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                    {/* LEFT SIDE */}
                    <div className="space-y-8">
                        {/* Booking Details */}
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <h2 className="mb-8 text-3xl font-bold">
                                Booking Details
                            </h2>

                            <div className="flex flex-col gap-6 md:flex-row">
                                {/* Movie Poster */}
                                {movie ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="h-64 w-44 rounded-2xl object-cover shadow-xl"
                                    />
                                ) : (
                                    <div className="h-64 w-44 animate-pulse rounded-2xl bg-zinc-800" />
                                )}

                                {/* Movie Information */}
                                <div className="flex flex-col justify-center space-y-5">
                                    <h1 className="text-4xl font-bold">
                                        {movie?.title || "Loading movie..."}
                                    </h1>

                                    <p className="text-zinc-400">
                                        📍 {theater || "Theater not available"}
                                    </p>

                                    <p className="text-zinc-400">
                                        🕒 {time || "Showtime not available"}
                                    </p>

                                    <p className="text-zinc-400">
                                        🎟 Seats: {seats || "No seats selected"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Your Details */}
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <h2 className="mb-8 text-3xl font-bold">
                                Your Details
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="mb-3 block text-zinc-400">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-5 outline-none transition focus:border-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-3 block text-zinc-400">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-5 outline-none transition focus:border-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="mb-3 block text-zinc-400">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-5 outline-none transition focus:border-red-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <h2 className="mb-8 text-3xl font-bold">
                                Payment Method
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* UPI */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => setSelectedPayment("UPI")}
                                    className={`rounded-2xl border p-6 text-left transition ${
                                        selectedPayment === "UPI"
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                                    } ${
                                        isProcessing
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                >
                                    <h3 className="text-xl font-semibold">
                                        📱 UPI
                                    </h3>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        Google Pay, PhonePe, Paytm
                                    </p>
                                </button>

                                {/* Card */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => setSelectedPayment("Card")}
                                    className={`rounded-2xl border p-6 text-left transition ${
                                        selectedPayment === "Card"
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                                    } ${
                                        isProcessing
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                >
                                    <h3 className="text-xl font-semibold">
                                        💳 Card
                                    </h3>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        Visa, Mastercard, RuPay
                                    </p>
                                </button>

                                {/* Net Banking */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() =>
                                        setSelectedPayment("Net Banking")
                                    }
                                    className={`rounded-2xl border p-6 text-left transition ${
                                        selectedPayment === "Net Banking"
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                                    } ${
                                        isProcessing
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                >
                                    <h3 className="text-xl font-semibold">
                                        🏦 Net Banking
                                    </h3>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        All major banks supported
                                    </p>
                                </button>

                                {/* Wallet */}
                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    onClick={() => setSelectedPayment("Wallet")}
                                    className={`rounded-2xl border p-6 text-left transition ${
                                        selectedPayment === "Wallet"
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800"
                                    } ${
                                        isProcessing
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                >
                                    <h3 className="text-xl font-semibold">
                                        👛 Wallet
                                    </h3>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        Amazon Pay, Mobikwik
                                    </p>
                                </button>
                            </div>

                            {/* Selected Payment */}
                            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                                <p className="text-sm text-zinc-400">
                                    Selected payment method
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    {selectedPayment}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-8 lg:sticky lg:top-10 lg:self-start">
                        {/* Order Summary */}
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <h2 className="mb-8 text-3xl font-bold">
                                Order Summary
                            </h2>

                            <div className="space-y-6">
                                <div className="flex justify-between text-zinc-400">
                                    <span>Ticket Total</span>

                                    <span className="text-white">₹{total}</span>
                                </div>

                                <div className="flex justify-between text-zinc-400">
                                    <span>Convenience Fee</span>

                                    <span className="text-white">
                                        ₹{convenienceFee}
                                    </span>
                                </div>

                                <div className="border-t border-zinc-800 pt-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold">
                                            Grand Total
                                        </span>

                                        <span className="text-4xl font-bold text-red-500">
                                            ₹{grandTotal}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secure Checkout */}
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-3xl">
                                    🔒
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold">
                                        Secure Checkout
                                    </h3>

                                    <p className="mt-2 text-zinc-400">
                                        Your payment information is encrypted
                                        and protected.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <h3 className="mb-5 text-xl font-semibold">
                                🎁 Promo Code
                            </h3>

                            <div className="flex gap-3">
                                <input
                                    placeholder="Enter coupon"
                                    disabled={isProcessing}
                                    className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-red-500"
                                />

                                <button
                                    type="button"
                                    disabled={isProcessing}
                                    className="rounded-2xl bg-red-600 px-6 font-semibold transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pay Button */}
                <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePayment}
                    className="mt-10 w-full rounded-3xl bg-gradient-to-r from-red-600 to-red-500 py-5 text-2xl font-bold shadow-[0_20px_60px_rgba(239,68,68,0.35)] transition-all duration-300 hover:scale-[1.01] hover:from-red-500 hover:to-red-400 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-70"
                >
                    {isProcessing
                        ? "⏳ Processing Payment..."
                        : `Pay ₹${grandTotal} Now →`}
                </button>
            </div>
        </main>
    );
}
