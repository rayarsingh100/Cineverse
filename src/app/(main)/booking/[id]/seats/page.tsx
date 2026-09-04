import { Suspense } from "react";
import SeatSelectionContent from "./seatselectioncontent";
import { getMovieDetails } from "../../../../../lib/tmdb";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const movie = await getMovieDetails(id);

    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-black text-white">
                    Loading...
                </main>
            }
        >
            <SeatSelectionContent
                movieTitle={movie.title}
                posterPath={movie.poster_path}
            />
        </Suspense>
    );
}
