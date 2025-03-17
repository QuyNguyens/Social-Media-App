import { NextRequest } from "next/server";
import streamServerClient from "@/lib/stream";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body) {
            return Response.json({ error: "User ID is required" }, { status: 400 });
        }

        await streamServerClient.upsertUser({
            id: body.result.id,
            username: body.result.userName,
            name: body.result.email
        })

        return Response.json({ status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
