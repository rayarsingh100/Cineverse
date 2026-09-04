import { NextResponse } from "next/server";
import { getSessionUser } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
    try {
        const user = await getSessionUser(request);

        if (!user) {
            return NextResponse.json(
                {
                    error: "You must be logged in to create a booking",
                },
                { status: 401 },
            );
        }

        const body = await request.json();

        const movieId = body.movieId?.toString().trim();
        const theater = body.theater?.toString().trim();
        const time = body.time?.toString().trim();
        const seats = body.seats?.toString().trim();
        const total = body.total?.toString().trim();
        const payment = body.payment?.toString().trim() || null;

        if (!movieId || !theater || !time || !seats || !total) {
            return NextResponse.json(
                {
                    error: "Movie, theater, time, seats and total are required",
                },
                { status: 400 },
            );
        }

        const booking = await prisma.booking.create({
            data: {
                userId: user.userId,
                movieId,
                theater,
                time,
                seats,
                total,
                payment,
            },
        });

        return NextResponse.json(
            {
                message: "Booking created successfully",
                booking,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Create booking API error:", error);

        return NextResponse.json(
            {
                error: "Something went wrong while creating the booking",
            },
            { status: 500 },
        );
    }
}

export async function GET(request: Request) {
    try {
        const user = await getSessionUser(request);

        if (!user) {
            return NextResponse.json(
                {
                    error: "You must be logged in to view bookings",
                },
                { status: 401 },
            );
        }

        const bookings = await prisma.booking.findMany({
            where: {
                userId: user.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            bookings,
        });
    } catch (error) {
        console.error("Get bookings API error:", error);

        return NextResponse.json(
            {
                error: "Something went wrong while loading bookings",
            },
            { status: 500 },
        );
    }
}
