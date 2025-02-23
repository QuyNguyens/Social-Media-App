"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import {Post as PostData} from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import PostMoreButton from "./PostMoreButton";

interface PostProps{
    post: PostData
}

export default function Post({post} : PostProps){
    const {user} = useSession();

    return <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                    <Link href={`/users/${post.email}`}>
                        <UserAvatar avatarUrl={post.avatar}/>
                    </Link>
                    <div>
                        <Link 
                            href={`/users/${post.email}`}
                            className="block font-medium hover:underline"
                        >
                            {post.userName}
                        </Link>
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
            <div className="white-space-pre-line break-words">
                {post.content.split("\n").map((line, index) => (
                    <p className="text-sm" key={index}>{line}</p>
                ))}
            </div>
        </article>
}