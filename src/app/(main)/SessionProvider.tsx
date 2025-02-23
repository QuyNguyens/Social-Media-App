"use client"

import { User } from "@/lib/types";
import React, { createContext, useContext } from "react";

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
            {children}
        </SessionContext.Provider>)
}

export function useSession(){
    const context = useContext(SessionContext);

    if(!context){
        throw new Error("useSession must be used within a SessionProvider");
    }

    return context;
}