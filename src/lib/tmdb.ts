const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getNowPlayingMovies() {
    const response = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=IN`,
        {
            next: {
                revalidate: 3600,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch now playing movies");
    }

    return response.json();
}

export async function getUpcomingMovies() {
    const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&region=IN`,
        {
            next: {
                revalidate: 3600,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
    }

    return response.json();
}

export async function getMovieDetails(movieId: string) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
        {
            next: {
                revalidate: 3600,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return response.json();
}

export async function getMovieCredits(movieId: string) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
        {
            next: {
                revalidate: 3600,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch credits");
    }

    return response.json();
}

export async function getMovieVideos(movieId: string) {
    const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
        {
            next: {
                revalidate: 3600,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movie videos");
    }

    return response.json();
}

export async function searchMovies(query: string, page = 1) {
    const url =
        `${BASE_URL}/search/movie?api_key=${API_KEY}` +
        `&query=${encodeURIComponent(query)}` +
        `&region=IN` +
        `&page=${page}`;

    let lastError: unknown;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            const response = await fetch(url, {
                next: { revalidate: 3600 },
            });

            if (!response.ok) {
                throw new Error(
                    `TMDB search failed with status ${response.status}`,
                );
            }

            return response.json();
        } catch (error) {
            lastError = error;

            console.error(`TMDB search attempt ${attempt}/3 failed:`, error);

            if (attempt < 3) {
                await new Promise((resolve) =>
                    setTimeout(resolve, 1000 * attempt),
                );
            }
        }
    }

    throw lastError || new Error("Failed to search movies");
}