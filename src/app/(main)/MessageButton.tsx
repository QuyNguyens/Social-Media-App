"use client";

import kyInstance from "@/lib/ky";
import { MessageCountInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "./SessionProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

interface MessageButtonProps{
    initializeData: MessageCountInfo;
}

export default function MessageButton({initializeData}: MessageButtonProps){
    const {user} = useSession();

    const {data} = useQuery({
        queryKey: ["unread-notification-count"],
        queryFn: async () => {
            const response = await kyInstance.get(`/api/message/unread-count?userId=${user.id}`).json<{ data: MessageCountInfo }>();
            return response.data;
        },
            initialData: initializeData,
            refetchInterval: 60 * 1000,
    });

    return <Button
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Messages"
            asChild
        >
            <Link href="/messages">
            <div className="relative">
                <Mail/>
                {
                    !!data?.unreadCount && (
                        <span className="absolute -right-1 -top-1 rounded-full bg-primary text-primary-foreground px-1 text-xs font-medium tabular-nums">
                            {data.unreadCount}
                        </span>
                    )   
                }
            </div>
            <span className="hidden lg:inline">Messages</span>
            </Link>
    </Button>
}