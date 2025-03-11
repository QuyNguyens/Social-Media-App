import { Post } from '@/lib/types'
import React from 'react'
import CommentInput from './CommentInput'
import Comment from './Comment';

interface CommentsProps {
    post: Post,
    userLoggedId: string;
}

const Comments = ({post, userLoggedId}: CommentsProps) => {
  return (
    <div className='space-y-3'>
        <CommentInput userId={userLoggedId} postId={post.id}/>
        <div className='divide-y'>
            {post.comments?.map((comment) =>(
                <Comment key={comment.id} postId={post.id} comment={comment}/>
            ))}
        </div>
    </div>
  )
}

export default Comments