import { Suspense } from "react";
import BookingSuccessContent from "../booking-success/bookingSuccessContent";

export default function Page() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-black text-white">
                    Loading...
                </main>
            }
        >
            <BookingSuccessContent />
        </Suspense>
    );
}
