"use client"
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from '../SessionProvider';
import kyInstance from '@/lib/ky';
import { PostsPage } from '@/lib/types';
import PostsLoadingSkeleton from '@/components/posts/PostsLoadingSkeleton';
import InfiniteScrollContainer from '@/components/InfiniteScrollContainer';
import { Loader2 } from 'lucide-react';
import Post from '@/components/posts/Post';
import DeletePostDialog from '@/components/posts/DeletePostDialog';

const PAGE_SIZE = 10;

const BookMarks = () => {
    const {user} = useSession();
      const {
          data,
          fetchNextPage,
          hasNextPage,
          isFetching,
          isFetchingNextPage,
          status,
        } = useInfiniteQuery({
          queryKey: ["post-feed", "bookmarks"],
          queryFn: ({ pageParam = null }: { pageParam?: string | null }) => {
            const searchParams = new URLSearchParams({
              userId: user.id,
              cursor: pageParam ?? "",
              pageSize: PAGE_SIZE.toString(),
            });
          
            return kyInstance
              .get(`${process.env.NEXT_PUBLIC_API_URL}/api/Post/bookmarks`, {
                searchParams,
              })
              .json<PostsPage>();
          },
          initialPageParam: null as string | null,
          getNextPageParam: (lastPage) => lastPage.nextCursor,
          staleTime: 1000 * 60 * 5,
          enabled: !!user?.id
        });
      
  
    const posts = data?.pages.flatMap((page) => page.posts) || [];
  
    if (status === "pending") {
      return <PostsLoadingSkeleton/>;
    }
  
    if (status === "success" && !posts.length && !hasNextPage) {
      return (
        <p className="text-center text-muted-foreground">
          No bookmarks has posted anything yet.
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

export default BookMarks