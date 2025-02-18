"use client"
import { validateRequest } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  // useEffect(() =>{
  //   const getAccessToken = async () =>{
  //     const user = await validateRequest();
  //     if(Object.keys(user).length == 0) redirect('/login')
  //   }
  //   getAccessToken();
  // },[])
  return (
    <div>
      Front Page
    </div>
  );
}
