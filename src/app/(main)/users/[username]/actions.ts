"use client"

import { updateUserProfileSchema, updateUserProfileValues } from "@/lib/validation";

export function updateProfile(credentials: updateUserProfileValues, avatar: string, id: string){

    return new Promise<{ success?: boolean}>(async (resolve) =>{
        try{
            const {userName} = updateUserProfileSchema.parse(credentials);
            const urlUpdate = `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`;
            console.log("updateUrl: ", urlUpdate);
            fetch(urlUpdate, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userName: userName, avatar: avatar, id: id})
            })
                .then(async (res) =>{
                    if(res.ok){
                        resolve({ success: true});
                    }else{
                        resolve({ success: false})
                    }
                })
                .catch((error) => {
                    console.log("Error login", error);
                    resolve({ success: false });
                });
        }
        catch(error){
            console.log("Error login", error);
            resolve({ success: false });
        }
    })
}