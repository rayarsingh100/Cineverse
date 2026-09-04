"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    Film,
    LockKeyhole,
    Mail,
    Loader2,
    CheckCircle2,
    X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchParams.get("signup") === "success") {
            setSuccess(
                "Account created successfully. You can sign in now.",
            );
        }
    }, [searchParams]);

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error || "Unable to sign in",
                );
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setError(
                "Something went wrong. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative">

            {/* Card glow */}
            <div className="absolute -inset-1 rounded-[30px] bg-red-600/20 opacity-70 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/75 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8 lg:p-10">

                {/* Accent line */}
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                {/* Mobile branding */}
                <Link
                    href="/"
                    className="mb-8 flex items-center gap-3 lg:hidden"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/20">
                        <Film size={21} />
                    </span>

                    <span className="text-xl font-black">
                        CineVerse
                    </span>
                </Link>

                {/* Heading */}
                <div className="mb-7">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold tracking-[0.3em] text-red-500">
                                WELCOME BACK
                            </p>

                            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                                Sign in
                            </h2>
                        </div>

                        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:flex">
                            <Film
                                size={22}
                                className="text-red-500"
                            />
                        </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                        Pick up where you left off and book your next movie.
                    </p>
                </div>

                {/* Success */}
                {success && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3.5 text-sm text-emerald-300">
                        <CheckCircle2
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <span>{success}</span>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3.5 text-sm text-red-300">
                        <X
                            size={18}
                            className="mt-0.5 shrink-0"
                        />

                        <span>{error}</span>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Email address
                        </label>

                        <div className="group relative">
                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-500"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-red-500/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-red-500/10"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Password
                            </label>

                            <button
                                type="button"
                                className="text-xs font-medium text-zinc-500 transition hover:text-red-400"
                                onClick={() =>
                                    setError(
                                        "Password reset will be added soon.",
                                    )
                                }
                            >
                                Forgot password?
                            </button>
                        </div>

                        <div className="group relative">
                            <LockKeyhole
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-500"
                            />

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-red-500/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-red-500/10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember */}
                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(event) =>
                                setRemember(event.target.checked)
                            }
                            className="h-4 w-4 accent-red-600"
                        />

                        <span className="text-xs text-zinc-500">
                            Keep me signed in
                        </span>
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-red-600 text-sm font-bold text-white shadow-xl shadow-red-600/20 transition hover:bg-red-500 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Signing you in...
                            </span>
                        ) : (
                            <>
                                <span className="relative z-10">
                                    Sign in to CineVerse
                                </span>

                                <span className="absolute right-5 text-lg transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-[10px] font-semibold tracking-[0.2em] text-zinc-600">
                        NEW TO CINEVERSE?
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Signup */}
                <Link
                    href="/signup"
                    className="flex h-13 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-zinc-300 transition hover:border-red-500/30 hover:bg-white/[0.06] hover:text-white"
                >
                    Create a new account
                </Link>

                {/* Security */}
                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-zinc-600">
                    <LockKeyhole size={13} />
                    Secure sign-in protected by CineVerse
                </div>
            </div>
        </div>
    );
}
