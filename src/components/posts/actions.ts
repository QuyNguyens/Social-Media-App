"use client"

export async function deletePost(id : string){
    
    return new Promise<{ error: string; success?: boolean }>(async (resolve) =>{

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/Post/delete-post/${id}`;

    try {
        fetch(url, {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
            .then(async (res) =>{
                if(res.ok){
                    resolve({error: '', success: true})
                }

                resolve({error: 'Delete failed', success: false})
            })
            .catch(error =>{
                resolve({ error: "Something went wrong. Please try again", success: false });
            })
    } catch (error) {
        resolve({error: 'Delete failed', success: false})
        
    }
    })

}