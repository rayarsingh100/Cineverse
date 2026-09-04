import { NextResponse } from "next/server";
import { getSessionUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(
    request: Request,
    context: {
        params: Promise<{ id: string }>;
    },
) {
    try {
        const user = await getSessionUser(request);

        if (!user) {
            return NextResponse.json(
                {
                    error:
                        "You must be logged in to delete a booking",
                },
                { status: 401 },
            );
        }

        const { id } = await context.params;

        const booking = await prisma.booking.findFirst({
            where: {
                id,
                userId: user.userId,
            },
        });

        if (!booking) {
            return NextResponse.json(
                {
                    error: "Booking not found",
                },
                { status: 404 },
            );
        }

        await prisma.booking.delete({
            where: {
                id: booking.id,
            },
        });

        return NextResponse.json({
            message: "Booking deleted successfully",
        });
    } catch (error) {
        console.error("Delete booking API error:", error);

        return NextResponse.json(
            {
                error:
                    "Something went wrong while deleting the booking",
            },
            { status: 500 },
        );
    }
}
