import { useSession } from "@/app/(main)/SessionProvider";
import { Post, User } from "@/lib/types";
import { PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
interface UserToolTipProps extends PropsWithChildren{
    user: Post
}

const UserTooltip = ({children, user}: UserToolTipProps) => {

    const {user: loggedInUser} = useSession();

    const userFollower : User = {
        id: user.userId,
        email: user.email || "",
        avatar: user.avatar,
        createAt: user.createAt,
        userName: user.userName || ""
    }

  return (
    <TooltipProvider>
        <Tooltip >
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className="bg-card shadow-2xl"> 
                <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
                    <div className="flex items-center justify-between gap-2">
                        <Link href={`/user/${user.email}`}>
                            <UserAvatar size={60} avatarUrl={user.avatar}/>
                        </Link>
                        {
                            loggedInUser.id != user.userId && (
                                <FollowButton userFollower={userFollower} isFollowed={user.isFollowed}/>
                            )
                        }
                    </div>
                    <div>
                        <Link href={`/users/${user.email}`}>
                            <div className="text-lg text-muted-foreground font-bold hover:underline">
                                {user.userName}
                            </div>
                            <div className="text-muted-foreground">{user.email}</div>
                        </Link>
                    </div>
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default UserTooltip