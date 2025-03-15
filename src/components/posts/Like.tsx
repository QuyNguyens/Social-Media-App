import kyInstance from '@/lib/ky';
import { NotificationType, Post, PostsPage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import React from 'react'

interface LikeProps{
    recipientId: string;
    userId: string;
    postId: string;
    isLikeByUser: boolean;
    likeCount: number;
    post: Post;
    setPost?: (post: Post) => void;
}

const Like = ({userId, recipientId, postId, isLikeByUser, likeCount,post, setPost}: LikeProps) => {

    const queryClient = useQueryClient();

    const handleLike = async () =>{
        const urlLike = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/like`;
        const urlUnLike = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/unlike`;
        const urlNotification = `${process.env.NEXT_PUBLIC_API_URL}/api/Notificate/create-notificate`;

        const req = { UserId: userId, PostId: postId };

        const notificateReq = {
                    RecipientId: recipientId,
                    IssuerId: userId,
                    Type: NotificationType.LIKE,
                    PostId: postId
                }

        if (!isLikeByUser) {
            await kyInstance.post(urlLike, { json: req });
            if(recipientId !== userId){
              await kyInstance.post(urlNotification, { json: notificateReq });
            }
        } else {
            await kyInstance.delete(urlUnLike, { json: req });
        }

        if(setPost){
          setPost({...post,isLikeByUser: !isLikeByUser, likeCount: isLikeByUser ? likeCount-1: likeCount+1})
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