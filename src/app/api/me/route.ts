import { Cookies } from "@/constants";
import { api } from "@/lib/api";
import { SessionData } from "@/types/api";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get(Cookies.SESSION);

    if (!sessionCookie) {
        return new Response(null, {
            status: 401,
            statusText: "Unauthorized",
        });
    }

    const session = await api.get<SessionData>("users/me", {
        headers: {
            Authorization: sessionCookie.value,
        },
    });

    if (!session) {
        return new Response(null, {
            status: 401,
            statusText: "Unauthorized",
        });
    }

    const response = await session.json();

    return new Response(JSON.stringify(response), {
        status: 200,
        statusText: "OK",
        headers: {
            "Content-Type": "application/json",
        },
    });
}
