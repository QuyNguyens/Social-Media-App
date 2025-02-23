import kyInstance from '@/lib/ky';
import { Followers } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
export default function userFollowerInfo(userId : string){
    const query = useQuery({
        queryKey: ["follower-info", userId],
        queryFn: () => kyInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Follow/follows/${userId}`).json<Followers[]>(),
        staleTime: Infinity
    })

    return query;
}