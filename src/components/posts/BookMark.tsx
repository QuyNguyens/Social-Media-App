import kyInstance from '@/lib/ky';
import { PostsPage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import React from 'react'

interface BookMarkProps{
    userId: string;
    postId: string;
    isBookMark: boolean;
}

const BookMark = ({userId, postId, isBookMark}: BookMarkProps) => {
  
    const queryClient = useQueryClient();

    const handleBookMark = async () =>{

        const urlBookmark = `${process.env.NEXT_PUBLIC_API_URL}/api/post/bookmark`;
        const urlUnBookmark = `${process.env.NEXT_PUBLIC_API_URL}/api/post/unbookmark`;

        const req = {
            UserId: userId,
            PostId: postId
        }
        try {
            if(isBookMark){
                await kyInstance.delete(urlUnBookmark, {json: req});
            }else{
                await kyInstance.post(urlBookmark, {json: req});
            }

            queryClient.setQueryData(["post-feed", "for-you"], (oldData: { pages: PostsPage[] } | undefined) => {
                        if (!oldData) return undefined;
                      
                        const data = {
                            ...oldData,
                            pages: oldData.pages.map((page) => ({
                              ...page,
                              posts: page.posts.map(post =>
                                post.id === postId ? { ...post, isBookMark: !isBookMark } : post
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
                        post.id === postId ? { ...post, isBookMark: !isBookMark} : post
                        ),
                    })),
                    };
    
                return data;
                });
            queryClient.invalidateQueries({ queryKey: ["post-feed", "bookmarks"] });
        } catch (error) {
            console.error(error);
        }
    }
    return (
    <button onClick={() => handleBookMark()}>
        <Bookmark className={cn("size-5", isBookMark && "fill-primary text-primary")}/>
    </button>
  )
}

export default BookMark