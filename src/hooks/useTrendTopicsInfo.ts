import kyInstance from '@/lib/ky';
import { useQuery } from '@tanstack/react-query';
export default function useTrendTopicsInfo(userId: string, isAll: boolean){

    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/hashtags`;
    
    if(!isAll){
        url += `/${userId}`
    }
    return useQuery({
        queryKey: ["trend-topics", userId],
        queryFn: async () => await kyInstance.get(url).json<object>(),
        staleTime: Infinity
    })
}