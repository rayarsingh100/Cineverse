import { jwtVerify } from "jose";

const secret = process.env.AUTH_SECRET;

if (!secret) {
    throw new Error("AUTH_SECRET is not set");
}

const secretKey = new TextEncoder().encode(secret);

export type SessionUser = {
    userId: string;
    email: string;
    name: string;
};

export async function getSessionUser(
    request: Request,
): Promise<SessionUser | null> {
    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader) {
        return null;
    }

    const cookies = cookieHeader.split(";");

    const sessionCookie = cookies
        .map((cookie) => cookie.trim())
        .find((cookie) =>
            cookie.startsWith("cineverse_session="),
        );

    if (!sessionCookie) {
        return null;
    }

    const token = sessionCookie.substring(
        "cineverse_session=".length,
    );

    try {
        const { payload } = await jwtVerify(
            token,
            secretKey,
        );

        if (
            typeof payload.userId !== "string" ||
            typeof payload.email !== "string" ||
            typeof payload.name !== "string"
        ) {
            return null;
        }

        return {
            userId: payload.userId,
            email: payload.email,
            name: payload.name,
        };
    } catch {
        return null;
    }
}
