import { validateRequest } from "@/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { User } from "@/lib/types";

const WhoToFollow = () => {

    const [follows, setFollows] = useState<User[]>([]);

    const getFollows = async () =>{
        const {user} = await validateRequest();
        if(user){
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Follow/follows/${user?.id}`;
                const res = await fetch(url,{
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
                })
                if(res.ok){
                    const result = await res.json();
                    console.log('result: ', result);
                    setFollows(result);
                }
                
            } catch (error) {
                console.log('error when get follow.', error);
            }
        }
    }

    useEffect(() =>{
        getFollows();
    },[]);

    return (
        <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
          <div className="text-xl font-bold">Who to follow</div>
          {
            follows.map((user) =>(
                <div key={user.id} className="flex items-center justify-between gap-3">
                    <Link 
                        href={`/users/${user.userName}`}
                        className="flex items-center gap-3"
                    >
                        <UserAvatar avatarUrl={user.avatar} className="flex-none"/>
                        <div>
                            <p className="line-cam-1 break-all font-semibold hover:underline">
                                {user.email}
                            </p>
                            <p className="line-camp-1 break-all text-muted-foreground">
                                @{user.userName}
                            </p>
                        </div>
                    </Link>
                    <Button>Follow</Button>
                </div>
            ))
          }
        </div>
      )
}

export default WhoToFollow