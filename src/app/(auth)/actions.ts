"use server"

import { validateRequest } from "@/auth"
import { redirect } from "next/navigation";

export async function logout(){
    const user = await validateRequest();

    if(Object.keys(user).length == 0){
        throw new Error("Unauthorized");
    }

    return redirect("/login")
}