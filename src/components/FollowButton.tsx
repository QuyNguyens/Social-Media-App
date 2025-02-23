import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";
import { useSession } from "@/app/(main)/SessionProvider";
import { Followers, User } from "@/lib/types";


interface FollowButtonProps {
    userFollower: User;
    isFollowed: boolean;
    onFollowChange?: (isFollowed: boolean) => void;
}

const FollowButton = ({ userFollower, isFollowed, onFollowChange }: FollowButtonProps) => {
    const { user } = useSession();
    const queryClient = useQueryClient();

    async function followHandle() {
        const urlFollow = `${process.env.NEXT_PUBLIC_API_URL}/api/Follow/follow`;
        const urlUnFollow = `${process.env.NEXT_PUBLIC_API_URL}/api/Follow/unfollow`;

        const req = { UserId: user.id, UserIdFollow: userFollower.id };

        queryClient.setQueryData(["follower-info", user.id], (oldData: Followers[] | undefined) => {
            if (!oldData) return [];
            return oldData.map(f => 
                f.id === userFollower.id ? { ...f, isFollowed: !isFollowed } : f
            );
        });

        !isFollowed ? await kyInstance.post(urlFollow, { json: req }) : await kyInstance.post(urlUnFollow, { json: req });

        queryClient.invalidateQueries({ queryKey: ["post-feed", "following"] });

        if (onFollowChange) {
            onFollowChange(!isFollowed);
            queryClient.invalidateQueries({ queryKey: ["follower-info", user.id] });
        }
    }

    return (
        <Button
            variant={isFollowed ? "secondary" : "default"}
            onClick={followHandle}
        >
            {isFollowed ? "UnFollow" : "Follow"}
        </Button>
    );
};

export default FollowButton;
