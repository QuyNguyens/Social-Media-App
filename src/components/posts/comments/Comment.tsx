"use client";

import { Comment as CommentData } from '@/lib/types';
import Link from 'next/link';
import UserAvatar from '@/components/UserAvatar';
import { formatRelativeDate } from '@/lib/utils';
import { useSession } from '@/app/(main)/SessionProvider';
import CommentMoreButton from './CommentMoreButton';

interface CommentProps{
    comment: CommentData;
    postId: string;
}

const Comment = ({comment, postId}: CommentProps) => {
    const {user} = useSession();

  return (
    <div className='flex gap-3 py-3 group/comment'>
        <span className='hidden sm:inline'>
            <Link href={`/users/${comment.email}`}>
                <UserAvatar avatarUrl={comment.avatar} size={40}/>
            </Link>
        </span>
        <div>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 text-sm'>
                    <Link href={`/users/${comment.email}`} className='font-medium hover:underline'>
                        {comment.email}
                    </Link>
                </div>
                <span className='text-muted-foreground'>
                    {formatRelativeDate(comment.createAt)}
                </span>
            </div>
            <div className='text-sm'>{comment.content}</div>
        </div>
        {
            comment.userId === user.id &&(
                <CommentMoreButton
                    comment={comment}
                    className='ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100'
                    postId={postId}
                    />
            )
        }
    </div>
  )
}

export default Comment