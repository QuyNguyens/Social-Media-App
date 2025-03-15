import { Button } from "@/components/ui/button"
import { Bell, Bookmark, Home, Mail } from "lucide-react"
import Link from "next/link"
import { useSession } from "./SessionProvider"

interface MenuBarProps{
    className?: string
}
const Menubar = ({className} : MenuBarProps) => {

    const {user} = useSession();
  return (
    <div className={className}>
        <Button 
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Home"
            asChild>
                <Link href="/">
                    <Home/>
                    <span className="hidden lg:inline">Home</span>
                </Link>
        </Button>

        <Button 
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Notification"
            asChild>
            <Link href="/notifications">
                <div className="relative">
                    <Bell />
                    {
                        (user?.notificationCount ?? 0) > 0 && (
                            <span className="absolute -right-1 -top-1 rounded-full bg-primary text-primary-foreground px-1 text-xs font-medium tabular-nums">
                                {user.notificationCount}
                            </span>
                        )   
                    }
                </div>
                <span className="hidden lg:inline">Notifications</span>
            </Link>
        </Button>

        <Button 
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Messages"
            asChild>
                <Link href="/messages">
                    <Mail/>
                    <span className="hidden lg:inline">Messages</span>
                </Link>
        </Button>

        <Button 
            variant="ghost"
            className="flex items-center justify-start gap-3"
            title="Bookmarks"
            asChild>
                <Link href="/bookmarks">
                    <Bookmark/>
                    <span className="hidden lg:inline">Bookmarks</span>
                </Link>
        </Button>
    </div>
  )
}

export default Menubar