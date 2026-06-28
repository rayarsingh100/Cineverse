import { Suspense } from "react";
import CheckoutContent from "../checkout/checkoutcontent";

export default function Page() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-black text-white">
                    Loading...
                </main>
            }
        >
            <CheckoutContent />
        </Suspense>
    );
}
