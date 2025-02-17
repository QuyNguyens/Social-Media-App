"use client"

import { signUpSchema, SignUpValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function signUp(
    credentials: SignUpValues
) : Promise<{error: string}>{
    try {
        const {username, email, password} = signUpSchema.parse(credentials);
    
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/User/signup`;

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({userName: username, email: email, password: password})
        })

        if(res.ok){
            redirect('/login')
        }

        return {
            error: "email already existing!!!"
        }
    } catch (error) {
        if(isRedirectError(error)) throw error;
        console.log("signup wrong")
        return {
            error: "something was wrong. Please try again"
        }
    }
}