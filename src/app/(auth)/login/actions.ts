"use client"
import { loginSchema, LoginValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function login(
    credentials: LoginValues
) : Promise<{error : string, success?: boolean}>{
    try {
        
        const {username, password} = loginSchema.parse(credentials);

        const urlLogin = `${process.env.NEXT_PUBLIC_API_URL}/api/User/login`;

        const res = await fetch(urlLogin, {
            method: "POST",
            headers:{
                "Accept": 'application/json',
                "Content-Type": 'application/json' 
            },
            body: JSON.stringify({email: username, password: password})
        })
        
        if(res.ok){
            const result = await res.json();

            localStorage.setItem("access_token", result.token);
            localStorage.setItem("expire_day", result.expireDay);
            return {
                error: "",
                success: true
            }
        }   

        return {
            error: "username or password was wrong",
            success: false
        }
    } catch (error) {
        if(isRedirectError(error)) throw error
        console.log("error login")

        return {
            error: "something wrong when login. Please try again",
            success: false
        }
    }
}