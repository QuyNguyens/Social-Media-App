import TrendingTopics from "./TrendingTopics"
import WhoToFollow from "./WhoToFollow"

interface TrendsSidebarProps{
  userId: string;
  isLoadAll: boolean;
}

const TrendsSidebar = ({ userId, isLoadAll} : TrendsSidebarProps) => {
  return (
    <div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none'>
      <WhoToFollow userId={userId}/>
      <TrendingTopics userId={userId} isLoadAll={isLoadAll}/>
    </div>
  )
}

export default TrendsSidebar