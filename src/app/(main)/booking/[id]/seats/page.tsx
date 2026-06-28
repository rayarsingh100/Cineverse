import { Suspense } from "react";
import SeatSelectionContent from "../seats/seatselectioncontent";

export default function Page() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-black text-white">
                    Loading...
                </main>
            }
        >
            <SeatSelectionContent />
        </Suspense>
    );
}
