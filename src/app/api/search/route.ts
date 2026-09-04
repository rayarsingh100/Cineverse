import { NextResponse } from "next/server";
import { searchMovies } from "../../../lib/tmdb";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const query = searchParams.get("query")?.trim();
        const pageParam = searchParams.get("page") || "1";

        const page = Math.max(1, Number.parseInt(pageParam, 10) || 1);

        if (!query) {
            return NextResponse.json({
                results: [],
                page: 1,
                total_pages: 0,
                total_results: 0,
            });
        }

        const data = await searchMovies(query, page);

        return NextResponse.json({
            results: data.results ?? [],
            page: data.page ?? page,
            total_pages: data.total_pages ?? 0,
            total_results: data.total_results ?? 0,
        });
    } catch (error) {
        console.error("Search API error:", error);

        return NextResponse.json(
            { error: "Failed to search movies" },
            { status: 500 },
        );
    }
}
