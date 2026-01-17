import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    return session;
}

export async function requireAdmin() {
    const session = await getServerSession(authOptions);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!session || (session.user as any).role !== "ADMIN") {
        return null;
    }

    return session;
}
