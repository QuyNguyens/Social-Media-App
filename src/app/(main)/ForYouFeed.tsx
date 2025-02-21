"use client";

import Post from "@/components/posts/Post";
import { Button } from "@/components/ui/button";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "./SessionProvider";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import DeletePostDialog from "@/components/posts/DeletePostDialog";

const PAGE_SIZE = 10;
export default function ForYouFeed() {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ["post-feed", "for-you"],
        queryFn: ({ pageParam = null }: { pageParam?: string | null }) =>
          kyInstance
            .get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/Post/get-all-posts`,
               {
                searchParams: new URLSearchParams({
                  cursor: pageParam ?? "",
                  pageSize: PAGE_SIZE.toString()
                })
               }
            )
            .json<PostsPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: 1000 * 60 * 5,
      });
    

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton/>;
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  console.log("post: ", posts);
  
  return (
        <InfiniteScrollContainer 
            className="space-y-5"
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
            {posts.length >0 && posts.map((post) =>(
                <Post key={post.id} post={post}/>
            ))}
            {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
            <DeletePostDialog
              open ={false}
              onClose={() =>{}}
              post={posts[0]}
            />
        </InfiniteScrollContainer>
      );
}