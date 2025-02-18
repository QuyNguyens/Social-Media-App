"use client"

import { Session } from "inspector/promises";
import React, { createContext, useContext } from "react";
import { User } from "../types/user";
import Navbar from "./Navbar";

export interface SessionContext{
    user: User
}

const SessionContext = createContext<SessionContext | null>(null)

export default function SessionProvider({
    children,
    value
} : React.PropsWithChildren<{value: SessionContext}>){
    return (
        <SessionContext.Provider value={value}>
            <div className="flex min-h-screen flex-col">
                <Navbar/>
                <div className="mx-auto max-w-7xl p-5">
                    {children}
                </div>
            </div>
        </SessionContext.Provider>)
}

export function useSession(){
    const context = useContext(SessionContext);

    if(!context){
        throw new Error("useSession must be used within a SessionProvider");
    }

    return context;
}