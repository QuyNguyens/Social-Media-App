import useTrendTopicsInfo from "@/hooks/useTrendTopicsInfo";
import { Loader2 } from "lucide-react";
import Link from "next/link";
interface TrendingTopicsProps{
    userId: string,
    isLoadAll: boolean
}
const TrendingTopics = ({userId, isLoadAll} : TrendingTopicsProps) => {

    const {data, isLoading} = useTrendTopicsInfo(userId, isLoadAll);
  return (
    <div className="bg-card p-5 space-y-5 rounded-2xl shadow-sm mt-5 overflow-y-auto h-[21.5rem]">
        <div className="text-xl font-bold">Trending topics</div>
        <div>
            {data && Object.entries(data).map(([key, value]) =>(
                <Link key={key} href={`/hashtag/${key}`} className="block mt-5">
                    <p className="line-clamp-1 break-all font-semibold hover:underline" title={key}>
                        {key}
                    </p>
                    <p className="text-sm text-muted-foreground">{value}   {value > 1 ? 'posts' : 'post'}</p>
                </Link>
            ))}
        </div>
        {isLoading && <Loader2 className="mx-auto my-3 animate-spin"/>}
    </div>
  )
}

export default TrendingTopics