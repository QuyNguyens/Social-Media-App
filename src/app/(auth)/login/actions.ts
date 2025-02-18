"use client";
import { loginSchema, LoginValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export function login(credentials: LoginValues) {
    return new Promise<{ error: string; success?: boolean }>(async (resolve) => {
        try {
            const { username, password } = loginSchema.parse(credentials);
            const urlLogin = `${process.env.NEXT_PUBLIC_API_URL}/api/User/login`;

            fetch(urlLogin, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: username, password: password }),
            })
                .then(async (res) => {
                    if (res.ok) {
                        const result = await res.json();
                        localStorage.setItem("access_token", result.token);
                        localStorage.setItem("expire_day", result.expireDay);
                        resolve({ error: "", success: true });
                    } else {
                        resolve({ error: "Username or password was wrong", success: false });
                    }
                })
                .catch((error) => {
                    console.log("Error login", error);
                    resolve({ error: "Something went wrong. Please try again", success: false });
                });
        } catch (error) {
            if (isRedirectError(error)) throw error;
            console.log("Error login", error);
            resolve({ error: "Something went wrong. Please try again", success: false });
        }
    });
}
