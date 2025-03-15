"use client";

import React, { createContext, useContext, useState } from "react";
import { User } from "@/lib/types";

export interface SessionContextType {
  user: User;
  setUser: (user: User) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export default function SessionProvider({
  children,
  initialUser
}: React.PropsWithChildren<{ initialUser: User }>) {
  const [user, setUser] = useState<User>(initialUser);
  
  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
