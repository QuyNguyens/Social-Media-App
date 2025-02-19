import { useSession } from "@/app/(main)/SessionProvider";
import { Post as PostData } from "@/app/types/post";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps{
    post: PostData
}

export default function Post({post} : PostProps){
    const {user} = useSession();

    return <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
                <Link href={`/users/${user.userName}`}>
                    <UserAvatar avatarUrl={user.avatar}/>
                </Link>
                <div>
                    <Link 
                        href={`/users/${user.userName}`}
                        className="block font-medium hover:underline"
                    >
                        {user.userName}
                    </Link>
                    <Link 
                        href={`/posts/${post.id}`}
                        className="block text-sm text-muted-foreground hover:underline">
                        {formatRelativeDate(post.createAt)}
                    </Link>
                </div>
            </div>
            <div className="white-space-pre-line break-words">
                {post.content.split("\n").map((line, index) => (
                    <p className="text-sm" key={index}>{line}</p>
                ))}
            </div>
        </article>
}