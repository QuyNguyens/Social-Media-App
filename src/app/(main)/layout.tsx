"use client";

import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Menubar from "./Menubar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ userName: string; email: string; id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { user } = await validateRequest();
      
      if (!user) redirect("/login");
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <SessionProvider initialUser={user!}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl p-5 flex w-full grow gap-5">
          <Menubar className="sticky top-[5.25rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
          {children}
        </div>
        <Menubar className="sticky bottom-0 flex w-full border-t justify-center gap-5 bg-card p-3 sm:hidden" />
      </div>
    </SessionProvider>
  );
}
