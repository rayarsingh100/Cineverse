"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
    Check,
    CheckCircle2,
    Eye,
    EyeOff,
    Film,
    LockKeyhole,
    Mail,
    User,
    X,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const passwordLength = password.length >= 6;
    const passwordNumber = /\d/.test(password);
    const passwordUppercase = /[A-Z]/.test(password);

    const passwordScore = [
        passwordLength,
        passwordNumber,
        passwordUppercase,
    ].filter(Boolean).length;

    const passwordsMatch =
        confirmPassword.length > 0 &&
        password === confirmPassword;

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (!agreed) {
            setError("Please accept the Terms and Privacy Policy");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Unable to create account");
                return;
            }

            router.push("/login?signup=success");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative">

            {/* Card glow */}
            <div className="absolute -inset-1 rounded-[30px] bg-red-600/20 opacity-70 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-zinc-950/75 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-8 lg:p-10">

                {/* Top accent */}
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
                                JOIN CINEVERSE
                            </p>

                            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                                Create account
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
                        Your next movie night is only a few clicks away.
                    </p>
                </div>

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
                    className="space-y-4"
                >

                    {/* Name */}
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Full name
                        </label>

                        <div className="group relative">
                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-500"
                            />

                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Your full name"
                                required
                                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-red-500/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-red-500/10"
                            />
                        </div>
                    </div>

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
                                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-red-500/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-red-500/10"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Password
                        </label>

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
                                placeholder="Create a strong password"
                                minLength={6}
                                required
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

                        {/* Password strength */}
                        {password.length > 0 && (
                            <div className="mt-3">
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded-full transition ${
                                                passwordScore >= level
                                                    ? "bg-red-500"
                                                    : "bg-white/10"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="mt-2 flex justify-between text-[11px]">
                                    <span className="text-zinc-500">
                                        Password strength
                                    </span>

                                    <span className="text-zinc-400">
                                        {passwordScore === 3
                                            ? "Strong"
                                            : passwordScore === 2
                                              ? "Good"
                                              : "Weak"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Confirm password
                        </label>

                        <div className="group relative">
                            <LockKeyhole
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-red-500"
                            />

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value,
                                    )
                                }
                                placeholder="Repeat your password"
                                minLength={6}
                                required
                                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-20 text-sm text-white outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-red-500/70 focus:bg-white/[0.06] focus:ring-4 focus:ring-red-500/10"
                            />

                            {confirmPassword.length > 0 && (
                                <span className="absolute right-12 top-1/2 -translate-y-1/2">
                                    {passwordsMatch ? (
                                        <CheckCircle2
                                            size={17}
                                            className="text-emerald-400"
                                        />
                                    ) : (
                                        <X
                                            size={17}
                                            className="text-red-400"
                                        />
                                    )}
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword,
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Terms */}
                    <label className="flex cursor-pointer items-start gap-3 pt-1">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(event) =>
                                setAgreed(event.target.checked)
                            }
                            className="peer sr-only"
                        />

                        <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                                agreed
                                    ? "border-red-500 bg-red-500"
                                    : "border-zinc-700 bg-white/5"
                            }`}
                        >
                            {agreed && (
                                <Check
                                    size={13}
                                    strokeWidth={3}
                                    className="text-white"
                                />
                            )}
                        </span>

                        <span className="text-xs leading-5 text-zinc-500">
                            I agree to the{" "}
                            <span className="text-zinc-300">
                                Terms of Service
                            </span>{" "}
                            and{" "}
                            <span className="text-zinc-300">
                                Privacy Policy
                            </span>
                        </span>
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative mt-2 flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-red-600 text-sm font-bold text-white shadow-xl shadow-red-600/20 transition hover:bg-red-500 hover:shadow-red-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <span className="relative z-10">
                            {loading
                                ? "Creating your account..."
                                : "Create my account"}
                        </span>

                        {!loading && (
                            <span className="absolute right-5 text-lg transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        )}
                    </button>
                </form>

                {/* Login */}
                <div className="mt-7 border-t border-white/10 pt-6 text-center">
                    <p className="text-sm text-zinc-500">
                        Already part of CineVerse?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-white transition hover:text-red-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Security */}
                <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-zinc-600">
                    <LockKeyhole size={13} />
                    Your password is securely encrypted
                </div>
            </div>
        </div>
    );
}
