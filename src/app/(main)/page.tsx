"use client"

import PostEditor from "@/components/posts/editor/PostEditor";
import { useEffect,useState } from "react";
import { Post as PostType } from "../types/post";
import Post from "@/components/posts/Post";

export default function Home() {

  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () =>{
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/posts`;

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if(res.ok){
        const result = await res.json();
        setPosts(result);
      }
    } catch (error) {
      console.log("get posts failed: ", error);
    }
  }

  useEffect(() =>{
    getPosts();
  },[])

  return (
    <main className="w-full min-w-0">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor refreshPosts={getPosts}/>
        {posts.map((item) =>(
          <Post key={item.id} post={item}/>
        ))}
      </div>
    </main>
  );
}
