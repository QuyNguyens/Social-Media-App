import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import kyInstance from "@/lib/ky";

export default function useInitializeChatClient(user: User){

    const [chatClient, setChatClient] = useState<StreamChat | null>(null);

    useEffect(() =>{
        const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

        const initializeChat = async () => {
            try {
                const { token } = await kyInstance
                    .get(`/api/get-token?userId=${user.id}`)
                    .json<{ token: string }>();

                await client.connectUser(
                    {
                        id: user.id,
                        username: user.userName,
                        name: user.email,
                        image: user.avatar
                    },
                    token
                );

                setChatClient(client);
            } catch (error) {
                console.error("Failed to connect user", error);
            }
        };

        initializeChat();

        return () => {
            setChatClient(null);
            client
                .disconnectUser()
                .catch(error => console.error("Failed to connect user", error))
                .then(() => console.log("Connection closed"));
        }
    }, [user.id, user.userName, user.email, user.avatar]);

    return chatClient;
}