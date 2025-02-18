"use client"
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider, { SessionContext } from "./SessionProvider";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Menubar from "./Menubar";

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

    return <SessionProvider value={user}>
        <div className="flex min-h-screen flex-col">
            <Navbar/>
            <div className="mx-auto max-w-7xl p-5 flex w-full gap-5">
                <Menubar className="sticky top-[5.25rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80"/>
                {children}
            </div>
            <Menubar className="fixed bottom-0 flex w-full border-t justify-center gap-5 bg-card p-3 sm:hidden"/>
        </div>
        </SessionProvider>
}