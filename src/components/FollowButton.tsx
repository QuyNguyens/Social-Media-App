import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";
import { useSession } from "@/app/(main)/SessionProvider";
import { Followers, NotificationType, PostsPage, User } from "@/lib/types";


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
        const urlNotification = `${process.env.NEXT_PUBLIC_API_URL}/api/Notificate/create-notificate`;

        const req = { UserId: user.id, UserIdFollow: userFollower.id };
        
        const notificateReq = {
            RecipientId: userFollower.id,
            IssuerId: user.id,
            Type: NotificationType.FOLLOW
        }

        if (!isFollowed) {
            await kyInstance.post(urlFollow, { json: req });
            await kyInstance.post(urlNotification, {json: notificateReq});
        } else {
            await kyInstance.post(urlUnFollow, { json: req });
        }
        
        queryClient.setQueryData(["follower-info", user.id], (oldData: Followers[] | undefined) => {
            if (!oldData) return [];
            return oldData.map(f => 
                f.id === userFollower.id ? { ...f, isFollowed: !isFollowed } : f
            );
        });

        queryClient.setQueryData(["post-feed", "for-you"], (oldData: { pages: PostsPage[] } | undefined) => {
            if (!oldData) return undefined;
          
            const data = {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  posts: page.posts.map(post =>
                    post.userId === userFollower.id ? { ...post, isFollowed: !isFollowed } : post
                  ),
                })),
              };

            return data;
          });
          
        queryClient.invalidateQueries({ queryKey: ["post-feed", "following"] });

        if (onFollowChange) {
            onFollowChange(!isFollowed);
            queryClient.invalidateQueries({ queryKey: ["follower-info", userFollower.id] });
        }
    }

    return (
        <Button
            variant={isFollowed ? "secondary" : "default"}
            onClick={() => followHandle()}
        >
            {isFollowed ? "UnFollow" : "Follow"}
        </Button>
    );
};

export default FollowButton;
