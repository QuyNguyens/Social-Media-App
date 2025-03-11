"use client";

import { useState } from 'react'
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { SendHorizonal } from 'lucide-react';
import { submitComment } from './actions';
import { useQueryClient } from '@tanstack/react-query';
import { PostsPage } from '@/lib/types';

interface CommentInputProps{
    userId: string;
    postId: string;
}

const CommentInput = ({userId, postId}: CommentInputProps) => {
    const[input, setInput] = useState('');
    const queryClient = useQueryClient();

    const onSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const {comment} = await submitComment(input, userId, postId);
        if(comment){
            const formattedDateString = comment.createAt.toString().replace(" ", "T");
            const dateObj = new Date(formattedDateString);

            comment.createAt = dateObj;
            setInput('');
            queryClient.setQueryData(["post-feed", "for-you"], (oldData: { pages: PostsPage[] } | undefined) => {
                if (!oldData) return undefined;
                
                const data = {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        posts: page.posts.map(post =>
                        post.id === postId? { ...post, comments: [...post.comments, comment]  } : post
                        ),
                    })),
                    };

                return data;
                });
            queryClient.setQueryData(["post-feed", "following"], (oldData: { pages: PostsPage[] } | undefined) => {
                if (!oldData) return undefined;
                
                const data = {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        posts: page.posts.map(post =>
                        post.id === postId? { ...post, comments: [...post.comments, comment]  } : post
                        ),
                    })),
                    };

                return data;
                });  
        }
    }

  return (
        <form className='flex w-full items-center gap-2' onSubmit={onSubmit}>
            <Input
             placeholder='Write a comment...'
             value={input}
             onChange={(e) => setInput(e.target.value)}
             autoFocus
             />
            <Button type="submit" variant="ghost" size="icon" disabled={!input.trim()}>
                <SendHorizonal/>
            </Button>
        </form>
  )
}

export default CommentInput