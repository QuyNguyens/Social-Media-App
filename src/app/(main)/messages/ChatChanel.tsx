import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Channel, ChannelHeader, ChannelHeaderProps, MessageInput, MessageList, Window } from "stream-chat-react"

interface ChatChanelProps{
  open: boolean;
  openSidebar: () => void;
}

const ChatChanel = ({open, openSidebar} : ChatChanelProps) => {
  return (
    <div className={cn('w-full md:block', !open && 'hidden')}>
        <Channel>
            <Window>
                <CustomChannelHeader
                  openSideBar={openSidebar}/>
                <MessageList/>
                <MessageInput/>
            </Window>
        </Channel>
    </div>
  )
}

export default ChatChanel

interface CustomChannelHeaderProps extends ChannelHeaderProps{
  openSideBar: () => void;
}

function CustomChannelHeader({openSideBar, ...props}: CustomChannelHeaderProps){
  return <div className="flex items-center gap-3">
    <div className="h-full p-2 md:hidden">
      <Button size="icon" variant="ghost" onClick={openSideBar}>
        <Menu className="size-5"/>
      </Button>
    </div>
    <ChannelHeader {...props}/>
  </div>
}