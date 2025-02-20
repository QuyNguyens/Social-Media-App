import { validateRequest } from "@/auth";
import Link from "next/link";
import { useEffect, useState } from "react"

const TrendingTopics = () => {

    const [trendingTopics, setTrendingTopics] = useState<object>({});

    const getTrendingTopics = async () =>{
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/hashtags`;

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            if(res.ok){
                const result = await res.json();
                setTrendingTopics(result);
            }
        } catch (error) {
            console.log("get trending topics error: ", error);
        }
    }

    useEffect(() => {      
        getTrendingTopics();
    },[])

  return (
    <div className="bg-card p-5 space-y-5 rounded-2xl shadow-sm mt-5">
        <div className="text-xl font-bold">Trending topics</div>
        <div>
            {Object.entries(trendingTopics).map(([key, value]) =>(
                <Link key={key} href={`/hashtag/${key}`} className="block mt-5">
                    <p className="line-clamp-1 break-all font-semibold hover:underline" title={key}>
                        {key}
                    </p>
                    <p className="text-sm text-muted-foreground">{value}   {value > 1 ? 'posts' : 'post'}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default TrendingTopics