import kyInstance from '@/lib/ky';
import { PostsPage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import React from 'react'

interface LikeProps{
    userId: string;
    postId: string;
    isLikeByUser: boolean;
    likeCount: number;
}

const Like = ({userId, postId, isLikeByUser, likeCount}: LikeProps) => {

    const queryClient = useQueryClient();

    const handleLike = async () =>{
        console.log("co vao day");
        const urlLike = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/like`;
        const urlUnLike = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/unlike`;

        const req = { UserId: userId, PostId: postId };
        
        if (!isLikeByUser) {
            await kyInstance.post(urlLike, { json: req });
        } else {
            await kyInstance.delete(urlUnLike, { json: req });
        }

        queryClient.setQueryData(["post-feed", "for-you"], (oldData: { pages: PostsPage[] } | undefined) => {
            if (!oldData) return undefined;
          
            const data = {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  posts: page.posts.map(post =>
                    post.id === postId ? { ...post, isLikeByUser: !isLikeByUser, likeCount: isLikeByUser ? likeCount-1: likeCount+1 } : post
                  ),
                })),
              };

            return data;
          });
        queryClient.invalidateQueries({ queryKey: ["post-feed", "following"] });
        queryClient.setQueryData(["post-feed", "following", userId], (oldData: { pages: PostsPage[] } | undefined) => {
            if (!oldData) return undefined;
          
            const data = {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                  ...page,
                  posts: page.posts.map(post =>
                    post.id === postId ? { ...post, isLikeByUser: !isLikeByUser, likeCount: isLikeByUser ? likeCount-1: likeCount+1 } : post
                  ),
                })),
              };

            return data;
          });
    }

  return (
    <button onClick={() => handleLike()} className='flex items-center gap-2'>
        <Heart className={cn("size-5", isLikeByUser && "fill-red-500 text-red-500")}/>
        <span className='text-sm font-medium tabular-nums'>
            {likeCount} <span className='hidden sm:inline'>likes</span>
        </span>
    </button>
  )
}

export default Like