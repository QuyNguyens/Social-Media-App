import TrendingTopics from "./TrendingTopics"
import WhoToFollow from "./WhoToFollow"

const TrendsSidebar = () => {
  return (
    <div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none'>
      <WhoToFollow/>
      <TrendingTopics/>
    </div>
  )
}

export default TrendsSidebar