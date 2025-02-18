"use client"
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider, { SessionContext } from "./SessionProvider";
import { useEffect, useState } from "react";

export default function Layout({children} : {children : React.ReactNode}){

    const [user, setUser] = useState<SessionContext>({user:{userName: '', email: '', id: ''}});

    useEffect( () =>{
        const getUser = async () =>{
            const {user} = await validateRequest();
            if(user == null) redirect('/login');
            setUser({user: user})
        }
        getUser()
    }, [])

    return <SessionProvider value={user}>{children}</SessionProvider>
}