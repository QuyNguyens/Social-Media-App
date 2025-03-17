import { ChannelList, ChannelPreviewMessenger, ChannelPreviewUIComponentProps, useChatContext } from "stream-chat-react";
import { useSession } from "../SessionProvider";
import { Button } from "@/components/ui/button";
import { MailPlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import NewChatDialog from "./NewChatDialog";
import { useQueryClient } from "@tanstack/react-query";

interface ChatSideBarProps{
    open: boolean;
    onClose: () => void;
}
export default function ChatSideBar({open, onClose} : ChatSideBarProps){
    const {user} = useSession();
    const queryClient = useQueryClient();

    const {channel} = useChatContext();
    
    useEffect(() => {
        if (channel?.id) {
            queryClient.invalidateQueries({ queryKey: ["unread-notification-count"] });
            queryClient.refetchQueries({ queryKey: ["unread-notification-count"] });
        }
    }, [channel?.id, queryClient]);

    const ChatChannelPreviewCustom = useCallback(
        (props: ChannelPreviewUIComponentProps) =>(
            <ChannelPreviewMessenger
                {...props}
                onSelect={() =>{
                    props.setActiveChannel?.(props.channel, props.watchers)
                    onClose();
                }}
            />
            ), [onClose]
    )
    
    return <div className={cn("size-full flex flex-col border-e md:w-72",
        open ? "flex" : "hidden"
    )}>
        <MenuHeader onClose={onClose}/>
        <ChannelList
            filters={{
                type: "messaging",
                members: {$in: [user.id]}
            }}
            showChannelSearch
            options={{state: true, presence: true, limit: 8, watch: true}}
            sort={{last_message_at: -1}}
            additionalChannelSearchProps={{
                searchForChannels: true,
                searchQueryParams: {
                    channelFilters: {
                        filters: {members: {$in: [user.id]}}
                    }
                }
            }}
            Preview={ChatChannelPreviewCustom}
        />
    </div>
}

interface MenuHeaderProps{
    onClose: () => void;
}

function MenuHeader({onClose}: MenuHeaderProps) {

    const [showNewChatDialog, setShowNewChatDialog] = useState(false);

    return <>
        <div className="flex items-center gap-3 p-2">
            <div className="h-full md:hidden">
                <Button size="icon" variant="ghost" onClick={onClose}>
                    <X className="size-5"/>
                </Button>
            </div>
            <h1 className="me-auto text-xl font-bold md:ms-2">Messages</h1>
            <Button onClick={() => setShowNewChatDialog(true)} size="icon" variant="ghost" title="Start new chat">
                <MailPlus className="size-5"/>
            </Button>
        </div>
        {showNewChatDialog && (
            <NewChatDialog onOpenChange={setShowNewChatDialog} 
                onChatCreated={() => {
                    setShowNewChatDialog(false);
                    onClose();
                }}
            />
        )}
    </> 
}