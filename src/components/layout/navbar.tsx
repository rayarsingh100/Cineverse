export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-black text-white border-b border-zinc-800">
      <h1 className="text-2xl font-bold">CineVerse 🎬</h1>

      <div className="flex items-center gap-6">
        <button className="hover:text-red-500 transition">Movies</button>

        <button className="hover:text-red-500 transition">Bookings</button>

        <button className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Login
        </button>
      </div>
    </nav>
  );
}
