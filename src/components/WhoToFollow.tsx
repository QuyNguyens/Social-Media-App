import Link from "next/link";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
import userFollowerInfo from "@/hooks/userFollowerInfo";
import { useSession } from "@/app/(main)/SessionProvider";
import { Loader2 } from "lucide-react";

interface WhoToFollowProps{
    userId: string,
}

const WhoToFollow = ({userId}: WhoToFollowProps) => {

    const {data, isLoading} = userFollowerInfo(userId);
    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm overflow-y-auto h-[21.5rem]">
          <div className="text-xl font-bold">Who to follow</div>
          {
            data && data.map((user) =>(
                <div key={user.id} className="flex items-center justify-between gap-3">
                    <Link 
                        href={`/users/${user.userName}`}
                        className="flex items-center gap-3"
                    >
                        <UserAvatar avatarUrl={user.avatar} className="flex-none"/>
                        <div>
                            <p className="line-cam-1 break-all font-semibold hover:underline">
                                {user.userName}
                            </p>
                            <p className="line-camp-1 text-sm break-all text-muted-foreground">
                                @{user.email}
                            </p>
                        </div>
                    </Link>
                    <FollowButton
                        userFollower={user}
                        isFollowed = {user.isFollowed}
                    />
                </div>
            ))
          }
          {isLoading && <Loader2 className="mx-auto my-3 animate-spin"/>}
        </div>
      )
}

export default WhoToFollow