"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const movie = searchParams.get("movie");
    const theater = searchParams.get("theater");
    const time = searchParams.get("time");
    const seats = searchParams.get("seats");
    const total = Number(searchParams.get("total"));

    const convenienceFee = 99;

    const grandTotal = total + convenienceFee;

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                    {/* Left Side */}
                    <div className="space-y-8">
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <h2 className="mb-8 text-3xl font-bold">
                                Booking Details
                            </h2>

                            <div className="flex flex-col gap-6 md:flex-row">
                                <img
                                    src="https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg"
                                    alt="The Flash"
                                    className="h-64 w-44 rounded-2xl object-cover shadow-xl"
                                />

                                <div className="flex flex-col justify-center space-y-5">
                                    <h1 className="text-4xl font-bold capitalize">
                                        {movie}
                                    </h1>

                                    <p className="text-zinc-400">
                                        📍 {theater}
                                    </p>

                                    <p className="text-zinc-400">🕒 {time}</p>

                                    <p className="text-zinc-400">
                                        🎟 Seats: {seats}
                                    </p>
                                </div>
                            </div>
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

                            <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                                <h2 className="mb-8 text-3xl font-bold">
                                    Payment Method
                                </h2>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <button className="rounded-2xl border border-red-500 bg-red-500/10 p-6 text-left transition hover:bg-red-500/20">
                                        <h3 className="text-xl font-semibold">
                                            📱 UPI
                                        </h3>

                                        <p className="mt-2 text-sm text-zinc-400">
                                            Google Pay, PhonePe, Paytm
                                        </p>
                                    </button>

                                    <button className="rounded-2xl border border-zinc-700 p-6 text-left transition hover:border-zinc-500 hover:bg-zinc-800">
                                        <h3 className="text-xl font-semibold">
                                            💳 Card
                                        </h3>

                                        <p className="mt-2 text-sm text-zinc-400">
                                            Visa, Mastercard, RuPay
                                        </p>
                                    </button>

                                    <button className="rounded-2xl border border-zinc-700 p-6 text-left transition hover:border-zinc-500 hover:bg-zinc-800">
                                        <h3 className="text-xl font-semibold">
                                            🏦 Net Banking
                                        </h3>

                                        <p className="mt-2 text-sm text-zinc-400">
                                            All major banks supported
                                        </p>
                                    </button>

                                    <button className="rounded-2xl border border-zinc-700 p-6 text-left transition hover:border-zinc-500 hover:bg-zinc-800">
                                        <h3 className="text-xl font-semibold">
                                            👛 Wallet
                                        </h3>

                                        <p className="mt-2 text-sm text-zinc-400">
                                            Amazon Pay, Mobikwik
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-8 lg:sticky lg:top-10 lg:self-start">
                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl lg:sticky lg:top-10">
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
                                    <div className="flex justify-between items-center">
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

                        <div className="rounded-[32px] border border-white/10 bg-zinc-900 p-8 shadow-2xl">
                            <h3 className="mb-5 text-xl font-semibold">
                                🎁 Promo Code
                            </h3>

                            <div className="flex gap-3">
                                <input
                                    placeholder="Enter coupon"
                                    className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-950 p-4 outline-none focus:border-red-500"
                                />

                                <button className="rounded-2xl bg-red-600 px-6 font-semibold transition hover:bg-red-700">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() =>
                        router.push(
                            `/booking-success?movie=${movie}&theater=${theater}&time=${time}&seats=${seats}&total=${grandTotal}`,
                        )
                    }
                    className="mt-10 w-full rounded-3xl bg-gradient-to-r from-red-600 to-red-500 py-5 text-2xl font-bold shadow-[0_20px_60px_rgba(239,68,68,0.35)] transition-all duration-300 hover:scale-[1.01]"
                >
                    Pay ₹{grandTotal} Now →
                </button>
            </div>
        </main>
    );
}
