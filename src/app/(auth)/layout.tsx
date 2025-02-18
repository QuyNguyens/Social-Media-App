"use client"
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Layout({children} : {children : React.ReactNode}){

    useEffect(() =>{
        const fetUser = async () =>{
            const {user} = await validateRequest();
            if(user != null) redirect('/');
        }
        fetUser()
    },[]);
    
    return <>{children}</>
}