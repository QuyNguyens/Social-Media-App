"use client"

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { NotificationsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from ".././SessionProvider";
import Notification from "./Notification";

const PAGE_SIZE = 10;


const Notifications = () => {

  const {user} = useSession();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ["notification", "for-you"],
        queryFn: ({ pageParam = null }: { pageParam?: string | null }) => {
          const searchParams = new URLSearchParams({
            userId: user.id,
            cursor: pageParam ?? "",
            pageSize: PAGE_SIZE.toString(),
          });
        
          return kyInstance
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/Notificate/notificates`, {
              searchParams,
            })
            .json<NotificationsPage>();
        },
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: 1000 * 60 * 5,
        enabled: !!user.id
      });
    

  const notifications = data?.pages.flatMap((page) => page.notifications) || [];

  if (status === "pending") {
    return <PostsLoadingSkeleton/>;
  }

  if (status === "success" && !notifications.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No notification for you.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading notification.
      </p>
    );
  }

  return (
        <InfiniteScrollContainer 
            className="space-y-5"
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
            {notifications.length >0 && notifications.map((notfication) =>(
                <Notification key={notfication.id} notification={notfication}/>
            ))}
            {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
            {/* <DeletePostDialog
              open ={false}
              onClose={() =>{}}
              post={posts[0]}
            /> */}
        </InfiniteScrollContainer>
      );
}

export default Notifications