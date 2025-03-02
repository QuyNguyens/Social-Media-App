import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import DeletePostDialog from "@/components/posts/DeletePostDialog";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "./SessionProvider";

const PAGE_SIZE = 10;

interface FollowFeedProps{
  userId: string;
  urlSub: string;
}

const FollowFeed = ({userId, urlSub}: FollowFeedProps) => {

  const {user} = useSession();
  const followerId = user.id;
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ["post-feed", "following", userId],
        queryFn: ({ pageParam = null }: { pageParam?: string | null }) => {
          const searchParams = new URLSearchParams({
            id: userId,
            cursor: pageParam ?? "",
            pageSize: PAGE_SIZE.toString(),
          });
        
          if (urlSub === "posts-user") {
            searchParams.set("followerId", followerId);
          }
        
          return kyInstance
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/Post/${urlSub}`, {
              searchParams,
            })
            .json<PostsPage>();
        },
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
        No following has posted anything yet.
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

export default FollowFeed