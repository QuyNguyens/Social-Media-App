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
import Comments from "./comments/Comments";
import { useState } from "react";
import { MessageSquare } from "lucide-react";

interface PostProps{
    post: PostData;
    setPost?: (post: PostData) => void;
}

export default function Post({post, setPost} : PostProps){
    const {user} = useSession();
    const [showComment, setShowComment] = useState(false);

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
                <div className="flex items-center gap-3">
                    <Like post={post} setPost={setPost} userId={user.id} recipientId={post.userId} postId={post.id} likeCount={post.likeCount} isLikeByUser={post.isLikeByUser}/>
                    <button onClick={() => setShowComment(!showComment)} className="flex items-center gap-2">
                        <MessageSquare className="size-5"/>
                        <span className="text-sm font-medium tabular-nums">
                            {post?.comments?.length}{" "}
                            <span className="hidden sm:inline">comments</span>
                        </span>
                    </button>
                </div>
                <BookMark userId={user.id} postId={post.id}  isBookMark={post.isBookMark}/>
            </div>
            <hr className="text-muted-foreground"/>
            {showComment && <Comments recipientId={post.userId} post={post} userLoggedId={user.id}/>
            }
        </article>
}