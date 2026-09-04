import Navbar from "../../../components/layout/navbar";
import { getNowPlayingMovies } from "../../../lib/tmdb";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
    const data = await getNowPlayingMovies();

    const movie =
        data.results.find(
            (item: { backdrop_path?: string | null }) =>
                item.backdrop_path,
        ) || data.results[0];

    return (
        <main className="relative min-h-[125vh] overflow-hidden bg-zinc-950 text-white">
            {/* Cinematic background */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: movie?.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                        : undefined,
                }}
            />

            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-black/55" />

            <div className="absolute inset-0 bg-gradient-to-br from-black via-black/65 to-red-950/40" />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/60" />

            {/* Cinematic glow */}
            <div className="absolute left-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[140px]" />

            <div className="absolute bottom-[-15%] right-[-10%] h-[500px] w-[500px] rounded-full bg-red-700/10 blur-[140px]" />

            {/* Navbar */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* Content */}
            <section className="relative z-10 flex min-h-[calc(125vh-80px)] items-center px-5 pb-20 pt-28 sm:px-8 lg:px-16 lg:pt-24">
                <div className="mx-auto grid w-full max-w-[1500px] items-center gap-12 lg:grid-cols-[1fr_520px] xl:gap-20">

                    {/* Left cinematic content */}
                    <div className="hidden lg:block">
                        <div className="max-w-2xl">

                            <div className="mb-6 flex items-center gap-3">
                                <span className="h-px w-12 bg-red-500" />

                                <p className="text-xs font-bold tracking-[0.35em] text-red-500">
                                    WELCOME BACK
                                </p>
                            </div>

                            <h1 className="text-6xl font-black leading-[0.95] tracking-tight xl:text-7xl">
                                Your cinema
                                <br />
                                <span className="text-red-500">
                                    awaits.
                                </span>
                            </h1>

                            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-300">
                                Sign in to continue discovering movies,
                                choosing your perfect seats and creating
                                unforgettable cinema experiences.
                            </p>

                            {/* Movie preview */}
                            <div className="mt-12 flex items-center gap-5">
                                {movie?.poster_path && (
                                    <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/50">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                            alt={movie.title}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                )}

                                <div>
                                    <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                                        NOW PLAYING
                                    </p>

                                    <p className="mt-2 text-xl font-bold text-white">
                                        {movie?.title || "Your next movie"}
                                    </p>

                                    <p className="mt-1 text-sm text-zinc-400">
                                        Discover. Book. Experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Login form */}
                    <div className="w-full">
                        <LoginForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
