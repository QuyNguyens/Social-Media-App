"use client"

import TrendsSidebar from '@/components/TrendsSidebar'
import Post from '@/components/posts/Post'
import kyInstance from '@/lib/ky';
import { Post as PostData, PostsPage } from '@/lib/types';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {

    const {id} = useParams<{id: string}>();
    const [post, setPost] = useState<PostData | null>();
    const queryClient = useQueryClient();
    
    useEffect(() =>{
      console.log("co vao day");
      async function fetchPost(){
        const data = queryClient.getQueryData<{
          pages: PostsPage[];
          pageParams: (string | null)[];
        }>(["post-feed", "for-you"]);

        if (!data){
          const url = `${process.env.NEXT_PUBLIC_API_URL}/api/post/post-user/${id}`;
          const post = await kyInstance.get(url).json<PostData>();
          setPost(post);
        }else{
            for (const page of data.pages) {
              const post = page.posts.find((p) => p.id === id);
              if (post)  setPost(post);
            }
        }
      }

      fetchPost();
    },[id]);
    

  return (
    <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
            <div className="rounded-2xl bg-card p-5 shadow-sm">
                <h1 className="text-center text-2xl font-bold">Post</h1>
            </div>
            {post ? <Post setPost={setPost} post={post || {} as PostData}/>: <p className='text-destructive text-center text-xl'>can not find the post!</p>}
        </div>
        <TrendsSidebar isLoadAll={true}/>
    </main>
  )
}

export default page