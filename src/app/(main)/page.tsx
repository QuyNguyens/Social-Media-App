"use client"

import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import ForYouFeed from "./ForYouFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowFeed from "./FollowFeed";
import { useSession } from "./SessionProvider";

export default function Home() {

    // useEffect( () =>{
    //     const getUser = async () =>{
    //         const {user} = await validateRequest();
    //         if(user == null) redirect('/login');
    //     }
    //     getUser()
    //   }, [])
    const {user} = useSession()
  return (
    <main className="w-full min-w-0 flex gap-5">
        <div className="w-full min-w-0 space-y-5">
          <PostEditor/>
          <Tabs defaultValue="for-you">
            <TabsList className="mb-3">
              <TabsTrigger value="for-you">For you</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <ForYouFeed/>
            </TabsContent>
            <TabsContent value="following">
              <FollowFeed userId={user.id} urlSub="following"/>
            </TabsContent>

          </Tabs>
        </div>
       <TrendsSidebar userId={user.id} isLoadAll={true}/>
      </main>
  );
}
