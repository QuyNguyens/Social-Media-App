import { NextRequest } from "next/server";
import streamServerClient from "@/lib/stream";
import { MessageCountInfo } from "@/lib/types";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return Response.json({ error: "User ID is required" }, { status: 400 });
        }

        const {total_unread_count} = await streamServerClient.getUnreadCount(
            userId
        )

        const data: MessageCountInfo = {
            unreadCount : total_unread_count
        }

        return Response.json({ data });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
