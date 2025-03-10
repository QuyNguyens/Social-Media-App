"use client"
import { useSession } from "@/app/(main)/SessionProvider";
import TrendingTopics from "./TrendingTopics"
import WhoToFollow from "./WhoToFollow"

interface TrendsSidebarProps{
  userId?: string;
  isLoadAll: boolean;
}

const TrendsSidebar = ({ userId, isLoadAll} : TrendsSidebarProps) => {
  const {user} = useSession();

  return (
    <div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none'>
      <WhoToFollow userId={userId || user.id}/>
      <TrendingTopics userId={userId || user.id} isLoadAll={isLoadAll}/>
    </div>
  )
}

export default TrendsSidebar