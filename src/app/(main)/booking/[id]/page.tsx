export default async function BookingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-zinc-950 p-10 text-white">
            <h1 className="text-5xl font-bold">Booking Page</h1>

            <p className="mt-4 text-zinc-400">Movie: {id}</p>
        </main>
    );
}
