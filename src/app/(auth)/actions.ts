"use client"

import { validateRequest } from "@/auth"
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function logout(){
    useEffect(() =>{
        const fetUser = async () =>{
            const {user} = await validateRequest();
            if(user == null){
                throw new Error("Unauthorized");
            }
        }
        fetUser();
    },[])


    return redirect("/login")
}