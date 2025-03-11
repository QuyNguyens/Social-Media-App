import { Comment } from "@/lib/types";

export function submitComment(content: string, userId: string, postId: string){
    return new Promise<{error: string; comment?: Comment}>(async (resolve) =>{
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/follow/comment`;

            fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    postId,
                    content
                })
            })
            .then(async (res) =>{
                if(res.ok){
                    const result = await res.json();

                    resolve({error: "", comment: result});
                }else{
                    resolve({error: "Something went wrong. Please try again"});
                }
            })
        } catch (error) {
            console.error(error);
            resolve({error: "something went wrong. Please try again."});
            
        }
    })
}

export function removeComment(id: string){
    return new Promise<{error: string; success?: boolean}>(async (resolve) =>{
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/follow/remove-comment/${id}`;

            fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }, 
            })
            .then(async (res) =>{
                if(res.ok){
                    resolve({error: "", success: true});
                }else{
                    resolve({error: "Something went wrong. Please try again"});
                }
            })
        } catch (error) {
            console.error(error);
            resolve({error: "something went wrong. Please try again.", success: false});
            
        }
    })
}
