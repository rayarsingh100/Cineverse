import { getNowPlayingMovies } from "../../lib/tmdb";

export default async function TestPage() {
    const data = await getNowPlayingMovies();

    return <pre>{JSON.stringify(data.results.slice(0, 5), null, 2)}</pre>;
}
