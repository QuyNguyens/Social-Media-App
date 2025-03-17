import { NextRequest } from "next/server";
import streamServerClient from "@/lib/stream";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        
        if (!userId) {
            return Response.json({ error: "User ID is required" }, { status: 400 });
        }

        const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
        const issuedAt = Math.floor(Date.now() / 1000) - 60;

        const token = streamServerClient.createToken(userId, expirationTime, issuedAt);

        return Response.json({ token });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
