import Navbar from "../../components/layout/navbar";
import MovieCard from "../../components/ui/MovieCard";

const movies = [
  {
    title: "Interstellar",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
  },
  {
    title: "Batman",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
  },
  {
    title: "Inception",
    image: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6",
  },
  {
    title: "Joker",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-8">
          Trending Movies 🔥
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.title}
              title={movie.title}
              image={movie.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
