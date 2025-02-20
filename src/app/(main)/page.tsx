"use client"

import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "./ForYouFeed";
import { useEffect, useState } from "react";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default function Home() {

    // useEffect( () =>{
    //     const getUser = async () =>{
    //         const {user} = await validateRequest();
    //         if(user == null) redirect('/login');
    //     }
    //     getUser()
    //   }, [])
  return (
    <main className="w-full min-w-0 flex gap-5">
        <div className="w-full min-w-0 space-y-5">
          <PostEditor/>
          <ForYouFeed/>
        </div>
        <TrendsSidebar/>
      </main>
  );
}
