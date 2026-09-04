"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Loader2, ArrowLeft } from "lucide-react";

type SearchMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
};

type SearchResultsContentProps = {
    query: string;
};

export default function SearchResultsContent({
    query,
}: SearchResultsContentProps) {
    const [movies, setMovies] = useState<SearchMovie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(false);

    // Load first page
    useEffect(() => {
        if (!query) {
            setLoading(false);
            return;
        }

        async function loadMovies() {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch(
                    `/api/search?query=${encodeURIComponent(query)}&page=1`,
                );

                if (!response.ok) {
                    throw new Error("Search failed");
                }

                const data = await response.json();

                setMovies(data.results ?? []);
                setPage(data.page ?? 1);
                setTotalPages(data.total_pages ?? 0);
            } catch (error) {
                console.error("Search page error:", error);
                setError(true);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        }

        loadMovies();
    }, [query]);

    // Load more
    async function loadMore() {
        if (loadingMore || page >= totalPages || !query) {
            return;
        }

        try {
            setLoadingMore(true);

            const nextPage = page + 1;

            const response = await fetch(
                `/api/search?query=${encodeURIComponent(
                    query,
                )}&page=${nextPage}`,
            );

            if (!response.ok) {
                throw new Error("Failed to load more movies");
            }

            const data = await response.json();

            setMovies((currentMovies) => [
                ...currentMovies,
                ...(data.results ?? []),
            ]);

            setPage(data.page ?? nextPage);
        } catch (error) {
            console.error("Load more error:", error);
        } finally {
            setLoadingMore(false);
        }
    }

    return (
        <>
            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-red-500 sm:text-sm">
                    CINEVERSE SEARCH
                </p>

                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    {query ? `Search results for "${query}"` : "Search Movies"}
                </h1>

                {query && !loading && !error && (
                    <p className="mt-3 text-sm text-zinc-500 sm:text-base">
                        {movies.length}{" "}
                        {movies.length === 1 ? "movie" : "movies"} loaded
                    </p>
                )}
            </div>

            {/* ===================================================== */}
            {/* LOADING */}
            {/* ===================================================== */}

            {loading && (
                <div className="flex min-h-[50vh] flex-col items-center justify-center">
                    <Loader2 size={34} className="animate-spin text-red-500" />

                    <p className="mt-4 text-sm text-zinc-500">
                        Searching CineVerse...
                    </p>
                </div>
            )}

            {/* ===================================================== */}
            {/* ERROR */}
            {/* ===================================================== */}

            {!loading && error && (
                <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                    <div className="text-5xl">⚠️</div>

                    <h2 className="mt-5 text-2xl font-bold">
                        Something went wrong
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        We couldnt load the search results.
                    </p>

                    <Link
                        href="/"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-500"
                    >
                        <ArrowLeft size={16} />
                        Back to Movies
                    </Link>
                </div>
            )}

            {/* ===================================================== */}
            {/* NO QUERY */}
            {/* ===================================================== */}

            {!loading && !error && !query && (
                <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                    <Search size={48} className="text-zinc-700" />

                    <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
                        Find your next movie
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                        Use the search button above to discover movies on
                        CineVerse.
                    </p>

                    <Link
                        href="/"
                        className="mt-7 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-500"
                    >
                        Back to Movies
                    </Link>
                </div>
            )}

            {/* ===================================================== */}
            {/* NO RESULTS */}
            {/* ===================================================== */}

            {!loading && !error && query && movies.length === 0 && (
                <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                    <div className="text-6xl">🍿</div>

                    <h2 className="mt-6 text-2xl font-bold">No movies found</h2>

                    <p className="mt-3 text-sm text-zinc-500">
                        Try searching with a different movie name.
                    </p>

                    <Link
                        href="/"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-500"
                    >
                        <ArrowLeft size={16} />
                        Back to Movies
                    </Link>
                </div>
            )}

            {/* ===================================================== */}
            {/* MOVIE RESULTS */}
            {/* ===================================================== */}

            {!loading && !error && movies.length > 0 && (
                <>
                    <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {movies.map((movie) => (
                            <Link
                                key={movie.id}
                                href={`/movies/${movie.id}`}
                                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-2 hover:border-red-500/40 hover:bg-white/[0.05]"
                            >
                                {/* Poster */}
                                <div className="aspect-[2/3] overflow-hidden bg-zinc-900">
                                    {movie.poster_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-4xl text-zinc-700">
                                            🎬
                                        </div>
                                    )}
                                </div>

                                {/* Movie Info */}
                                <div className="p-4">
                                    <h2 className="line-clamp-2 text-sm font-bold text-white sm:text-base">
                                        {movie.title}
                                    </h2>

                                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                                        <span>
                                            {movie.release_date
                                                ? movie.release_date.slice(0, 4)
                                                : "N/A"}
                                        </span>

                                        <span className="flex items-center gap-1 text-yellow-400">
                                            ★{" "}
                                            {movie.vote_average
                                                ? movie.vote_average.toFixed(1)
                                                : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ================================================= */}
                    {/* LOAD MORE */}
                    {/* ================================================= */}

                    {page < totalPages && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={loadMore}
                                disabled={loadingMore}
                                className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loadingMore ? (
                                    <>
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />
                                        Loading...
                                    </>
                                ) : (
                                    "Load More"
                                )}
                            </button>
                        </div>
                    )}

                    {/* End */}
                    {page >= totalPages && totalPages > 0 && (
                        <p className="mt-12 text-center text-xs uppercase tracking-[0.2em] text-zinc-600">
                            Youve reached the end of the results
                        </p>
                    )}
                </>
            )}
        </>
    );
}
