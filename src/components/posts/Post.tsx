"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import {Post as PostData} from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";
import UserTooltip from "../UserTooltip";
import DisplayImages from "./editor/DisplayImages";
import Like from "./Like";
import BookMark from "./BookMark";

interface PostProps{
    post: PostData
}

export default function Post({post} : PostProps){
    const {user} = useSession();

    return <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                    <UserTooltip user={post}>
                        <Link href={`/users/${post.email}`}>
                            <UserAvatar avatarUrl={post.avatar}/>
                        </Link>
                    </UserTooltip>
                    <div>
                        <UserTooltip user={post}>

                            <Link 
                                href={`/users/${post.email}`}
                                className="block font-medium hover:underline"
                            >
                                {post.userName}
                            </Link>
                        </UserTooltip>
                        <Link 
                            href={`/posts/${post.id}`}
                            className="block text-sm text-muted-foreground hover:underline">
                            {formatRelativeDate(post.createAt)}
                        </Link>
                    </div>
                </div>
                {
                    post.userId === user.id && (
                        <PostMoreButton post={post} className="opacity-0 transition-opacity group-hover/post:opacity-100"/>
                    )
                }
            </div>
            <div>

                <div className="white-space-pre-line break-words">
                    {post.content.split("\n").map((line, index) => (
                    <Linkify key={index}>
                        <p className="text-sm">{line}</p>
                    </Linkify>
                    ))}
                </div>
                <DisplayImages images={post.urlImages}/>
            </div>
            <hr className="text-muted-foreground"/>
            <div className="flex justify-between items-center">
                <Like userId={user.id} postId={post.id} likeCount={post.likeCount} isLikeByUser={post.isLikeByUser}/>
                <BookMark userId={user.id} postId={post.id}  isBookMark={post.isBookMark}/>
            </div>
        </article>
}