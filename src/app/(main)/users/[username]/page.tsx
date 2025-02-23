"use client";

import UserAvatar from "@/components/UserAvatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import FollowButton from "@/components/FollowButton";
import { useParams } from "next/navigation";
import TrendsSidebar from "@/components/TrendsSidebar";
import { getUserByEmail } from "../actions";
import { useEffect, useState } from "react";
import { UserProfileInfo } from "@/lib/types";
import { useSession } from "../../SessionProvider";
import FollowFeed from "../../FollowFeed";

const Page = () => {
    const [userInfo, setUserInfo] = useState<UserProfileInfo | null>(null);
    const { user } = useSession();
    const { username } = useParams<{ username: string }>();

    useEffect(() => {
        if (!username) return;

        const fetchUser = async () => {
            try {
                const { userInfo } = await getUserByEmail({ 
                    userId: user.id, 
                    email: decodeURIComponent(username) 
                });
                setUserInfo(userInfo);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        fetchUser();
    }, [username, user.id]);

    const handleFollowChange = (newIsFollowed: boolean) => {
        if (!userInfo) return;
        setUserInfo(prev => prev ? { 
            ...prev, 
            user: { ...prev.user, isFollowed: newIsFollowed },
            followerCount: newIsFollowed ? prev.followerCount + 1 : prev.followerCount - 1
        } : null);
    };

    return (
        <div className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
                <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
                    <UserAvatar
                        avatarUrl={userInfo?.user.avatar}
                        size={250}
                        className="mx-auto size-full max-h-60 max-w-60 rounded-full"
                    />
                    <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                        <div className="me-auto space-y-3">
                            <div>
                                <h1 className="text-3xl font-bold">{userInfo?.user.userName}</h1>
                                <div className="text-muted-foreground">@{userInfo?.user.email}</div>
                            </div>
                            <div>
                                Member since {userInfo?.user.createAt
                                    ? format(new Date(userInfo.user.createAt), "MMM d, yyyy")
                                    : "N/A"}
                            </div>
                            <div className="flex items-center gap-3">
                                <span>
                                    Posts: <span className="font-semibold">{userInfo?.postCount}</span>
                                </span>
                                <span>
                                    Followers: <span className="font-semibold">{userInfo?.followerCount}</span>
                                </span>
                            </div>
                        </div>
                        {userInfo && userInfo?.user.id === user.id ? (
                            <Button>Edit Profile</Button>
                        ) : (
                            userInfo && <FollowButton 
                                userFollower={userInfo.user} 
                                isFollowed={userInfo.user.isFollowed}
                                onFollowChange={handleFollowChange}
                            />
                        )}
                    </div>
                </div>
                {userInfo && <div className="space-y-5">
                    <FollowFeed userId={userInfo.user.id} urlSub="posts-user"/>
                </div>}
            </div>
            {userInfo && <TrendsSidebar userId={userInfo.user.id} isLoadAll={false} />}
        </div>
    );
};

export default Page;

