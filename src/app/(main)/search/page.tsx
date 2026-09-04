import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import SearchResultsContent from "./SearchResultsContent";

type SearchPageProps = {
    searchParams: Promise<{
        query?: string;
    }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.query?.trim() || "";

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            {/* Navbar */}
            <Navbar />

            {/* Search Content */}
            <section className="px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-16">
                <div className="mx-auto max-w-[1700px]">
                    <SearchResultsContent query={query} />
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    );
}
