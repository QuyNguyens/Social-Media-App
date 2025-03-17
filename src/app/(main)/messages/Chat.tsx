"use client"

import { Loader2 } from "lucide-react";
import useInitializeChatClient from "./useInitializeChatClient";
import {Chat as StreamChat} from "stream-chat-react";
import ChatSideBar from "./ChatSideBar";
import ChatChanel from "./ChatChanel";
import { useSession } from "../SessionProvider";
import { useTheme } from "next-themes";
import { useState } from "react";


const Chat = () => {

    const {user} = useSession();
    const {resolvedTheme} = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const chatClient = useInitializeChatClient(user);

    if(!chatClient){
        return <Loader2 className="mx-auto my-3 animate-spin"/>
    }

  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
        <div className="absolute bottom-0 top-0 flex w-full">
            <StreamChat
                client={chatClient}
                theme={
                    resolvedTheme === "dark"
                    ? "str-chat__theme-dark"
                    : "str-chat__theme-light"   
                }
            >
                <ChatSideBar open={sidebarOpen} onClose={() =>setSidebarOpen(false)}/>
                <ChatChanel open={!sidebarOpen} openSidebar={() => setSidebarOpen(true)}/>
            </StreamChat>
        </div>
    </main>
  )
}

export default Chat