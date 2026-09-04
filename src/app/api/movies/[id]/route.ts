import { NextResponse } from "next/server";
import { getMovieDetails } from "../../../../lib/tmdb";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;

        const movie = await getMovieDetails(id);

        return NextResponse.json({
            title: movie.title,
            poster_path: movie.poster_path,
        });
    } catch (error) {
        console.error("Movie API error:", error);

        return NextResponse.json(
            { error: "Failed to fetch movie" },
            { status: 500 },
        );
    }
}
